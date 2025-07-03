addEventListener("DOMContentLoaded", () => {
  const socket = io();

  // --- Función para renderizar productos ---
  const renderProducts = (products) => {
    const template = document.getElementById("product-template").innerHTML;
    const compiledTemplate = Handlebars.compile(template);
    const html = compiledTemplate({ products });
    document.getElementById("product-list").innerHTML = html;

    // Agregar evento a los botones de eliminar
    document.querySelectorAll(".btnEliminar").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        deleteProduct(productId);
      });
    });

    // Agregar evento a los botones de agregar al carrito
    document.querySelectorAll(".btnAgregar").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        addToCart(productId);
      });
    });
  };

  // --- Escuchar eventos del servidor ---
  socket.on("products", (products) => {
    renderProducts(products);
  });

  // --- Función para agregar producto al carrito ---
  const addToCart = (productId) => {
    socket.emit("addToCart", productId);
  };
});