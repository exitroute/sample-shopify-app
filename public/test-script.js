const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
document.getElementsByTagName("head")[0].appendChild(script);

// console.log(script);

function handler() {
  const header = $("header.site-header").parent();

  const makeHeader = (data) => {
    header
      .prepend(`<div>${data}</div>`)
      .css({ "background-color": "orange", "text-align": "center" });
  };

  fetch(
    "https://3e37da5211d8.ngrok.io/api/products?shop=shop=sample-app-exitroute.myshopify.com"
  )
    .then((res) => res.json())
    .then((data) => {
      makeHeader(data.data);
      console.log(data);
    })
    .catch((error) => console.log(error));
}
