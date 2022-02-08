const socket = io.connect();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("new_product", {
    producto: document.querySelector("input[name=producto]").value,
    precio: document.querySelector("input[name=precio]").value,
    cantidad: document.querySelector("input[name=cantidad]").value,
  });
  console.log("Se envia producto al servidor...");
});

const render = (data) => {
    const html = data
      .map((elem) => {
        return `<div>
       <strong>${elem.producto}</strong>
       <em>${elem.precio}</em>
       <strong>${elem.cantidad}</strong>
      </div>`;
      })
      .join("");
    document.querySelector("#products").innerHTML = html;
  };
  
  const renderhbs = (products) => {
    const tplHtml = document.querySelector("#productos-lista").innerHTML;
    const template = Handlebars.compile(tplHtml);
    document.querySelector("#products").innerHTML = template({ products });
  };
  
  socket.on("product_received", (data) => {
    renderhbs(data);
  });