import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Layout,
  Page,
  ResourceList,
  Stack,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const CREATE_SCRIPTTAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

function ScriptPage() {
  const [createScripts] = useMutation(CREATE_SCRIPTTAG);
  const [deleteScripts] = useMutation(DELETE_SCRIPTTAG);

  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="These are the script tags:" sectioned>
            <p>Create or delete a script tag</p>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Delete Tag" sectioned>
            <Button
              primary
              size="slim"
              type="submit"
              onClick={() => {
                createScripts({
                  variables: {
                    input: {
                      src: "https://26d1a892e054.ngrok.io/test-script.js",
                      displayScope: "ALL",
                    },
                  },
                  refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                });
              }}
            >
              Create Script Tap
            </Button>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Script", plural: "Scripts" }}
              items={data.scriptTags.edges}
              renderItem={(item) => {
                return (
                  <ResourceList.Item id={item.id}>
                    <Stack>
                      <Stack.Item>
                        <p>{item.node.id}</p>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          type="submit"
                          onClick={() => {
                            deleteScripts({
                              variables: {
                                id: item.node.id,
                              },
                              refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                            });
                          }}
                        >
                          Delete Script Tag
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ScriptPage;
