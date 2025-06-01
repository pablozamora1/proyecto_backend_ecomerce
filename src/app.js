import express from "express";

import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/products", async (req, res) => {
  res.send(await product.getProducts());
});
app.get("/api/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductsById(id));
});

app.post("/api/products", async (req, res) => {
  const newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

app.delete("/api/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProductsById(id));
});
  
app.listen(PORT, () => {
  console.log(`escuchando en el http://localhost:${PORT}`);
});
