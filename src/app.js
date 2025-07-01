import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import "./db/database.js"; // Importar la conexión a la base de datos
import viewsRouter from "./routes/views.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import ProductManager from "./dao/db/ProductManager_db.js";

const productManager = new ProductManager();

const app = express();
const PORT = 8080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use("/", viewsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`escuchando en el http://localhost:${PORT}`);
});

// Socket.io

const io = new Server(httpServer);

let messages = [];

io.on("connection", (socket) => {
  // console.log("un cliente nuevo se conecto");
  // chat
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messagesLogs", messages);
  });
});

//productos en tiempo real

io.on("connection", async (socket) => {
  //Envia el array de products al cliente que se conectó:
  socket.emit("products", await productManager.getProducts());

  //Recibe el evento "eliminarProducto" desde el cliente:
  socket.on("deleteProduct", async (_id) => {
    await productManager.deleteProductsById(_id);
    //Envia el array de products actualizado a todos los products:
    io.sockets.emit("products", await productManager.getProducts());
  });

  //Recibe el evento "agregarProducto" desde el cliente:
  socket.on("addProduct", async (products) => {
    await productManager.addProducts(products);
    //Envia el array de products actualizado a todos los products:
    io.sockets.emit("products", await productManager.getProducts());
  });
});
