const socket = io();

socket.on("products", (data) => {
  console.log(data);
  const template = data
    .map(
      (each) => `
        <div class="card" style="width: 18rem;">
    <img src="${each.photo}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${each.title}</h5>
      <p>Stock: ${each.stock}</p>
        <p>Precio: ${each.price}</p>
    </div>
  </div>
      `
    )
    .join("");
  document.querySelector("#products").innerHTML = template;
});

document.querySelector("#newProduct").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const photo = document.getElementById("photo").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  socket.emit("newProduct", data);
  alert("producto creado");
});
