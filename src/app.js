import express from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`escuchando en el http://localhost:${PORT}`);
});
