import express from "express";
const router = express.Router();
import ProductManager from "../dao/db/ProductManager_db.js";
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("index", { products });
  } catch (error) {
    res.send("Error al obtener los productos");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.send("Error al obtener los productos");
  }
});

export default router;
