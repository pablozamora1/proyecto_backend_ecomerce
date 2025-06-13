const socket = io();

//productos en tiempo real

socket.on("products", (data) => {
  renderProducts(data);
});

//Función para renderizar la tabla de products:
const renderProducts = (products) => {
  const containerProducts = document.getElementById("containerProducts");
  containerProducts.innerHTML = "";

  products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${item.thumbnails}" alt="">
    <p>Titulo: ${item.title} </p>
    <p>Descripcion: ${item.description} </p>
    <p>Precio: ${item.price} </p>
    <button> Eliminar Producto </button>
        `;
    containerProducts.appendChild(card);

    //Evento para eliminar producto:
    card.querySelector("button").addEventListener("click", () => {
      deleteProduct(item.id);
    });
  });
};

//Eliminar producto:
const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

//Agregar producto:

document.getElementById("btnEnviar").addEventListener("click", () => {
  addProduct();
});

const addProduct = () => {
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnails: document.getElementById("thumbnails").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("addProduct", product);
};
