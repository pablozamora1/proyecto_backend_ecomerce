import express from "express";
const router = express.Router();
import ProductManager from "../dao/db/ProductManager_db.js";
const productManager = new ProductManager();
import CartManager from "../dao/db/CartManager_db.js";
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("index", { products });
  } catch (error) {
    res.send("Error al obtener los productos");
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cart = await cartManager.getCart();
    res.render("carts", { cart });
  } catch (error) {
    res.send("Error al obtener el carrito");
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
