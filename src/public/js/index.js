const socket = io();

// --- Productos en tiempo real ---
// Escucha el evento 'products' del servidor para renderizar la lista actualizada de productos.
socket.on("products", (data) => {
  renderProducts(data);
});

// --- Función para renderizar la tabla de productos ---
const renderProducts = (products) => {
  const containerProducts = document.getElementById("containerProducts");
  containerProducts.innerHTML = ""; // Limpia el contenedor antes de renderizar

  products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    // Asegúrate de que los valores numéricos y booleanos se muestren correctamente
    // y que 'thumbnails' sea un array (aunque aquí lo muestre como una sola imagen si es el primer elemento)
    card.innerHTML = `
      <img src="${
        item.thumbnail && item.thumbnail.length > 0
          ? item.thumbnail[0]
          : "placeholder.jpg"
      }" alt="${item.title || "Product Image"}">
      <p>Titulo: ${item.title} </p>
      <p>Descripcion: ${item.description} </p>
      <p>Precio: $${parseFloat(item.price).toFixed(2)} </p>
      <p>Stock: ${parseInt(item.stock, 10)} </p>

      <button class="delete-button" data-id="${
        item._id
      }"> Eliminar Producto </button>
    `;
    containerProducts.appendChild(card);

    // --- Evento para eliminar producto ---
    // Usamos un selector de clase para el botón y el atributo data-id
    card.querySelector(".delete-button").addEventListener("click", () => {
      // Obtenemos el ID directamente del atributo data-id del botón
      const productIdToDelete = card.querySelector(".delete-button").dataset.id;
      deleteProduct(productIdToDelete);
    });
  });
};

// --- Función para eliminar un producto ---
const deleteProduct = (_id) => {
  console.log("Intentando eliminar producto con ID:", _id); // Para depuración
  socket.emit("deleteProduct", _id); // Envía el ID del producto al servidor
};

// --- Función para agregar producto ---

document.getElementById("btnEnviar").addEventListener("click", () => {
  addProduct();
});

const addProduct = () => {
  // Asegúrate de obtener los valores correctamente y convertirlos a sus tipos adecuados
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value), // Convertir a número
    // Asegúrate que el campo 'thumbnails' pueda manejar un array o un string si solo esperas una URL
    // Si tu modelo espera un array de strings para 'thumbnail', haz esto:
    thumbnail: document
      .getElementById("thumbnails")
      .value.split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0), // Divide por comas y limpia espacios
    code: document.getElementById("code").value,
    stock: parseInt(document.getElementById("stock").value, 10), // Convertir a entero
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true", // Convertir a booleano
  };

  // Validar que los campos no estén vacíos antes de enviar
  if (
    !product.title ||
    !product.description ||
    !product.code ||
    isNaN(product.price) ||
    isNaN(product.stock) ||
    !product.category
  ) {
    alert(
      "Por favor, completa todos los campos obligatorios y asegúrate que precio y stock sean números."
    );
    return; // Detiene la ejecución si falta algún campo
  }

  socket.emit("addProduct", product);

  // Opcional: Limpiar los campos del formulario después de enviar
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnails").value = "";
  document.getElementById("code").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("category").value = "";
  document.getElementById("status").value = "true"; // Resetea a true por defecto
};
