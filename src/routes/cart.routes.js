import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
const carts = new CartManager();
const router = Router();
router.post("/", async (req, res) => {
  res.send(await carts.addCarts());
});

router.get("/", async (req, res) => {
  res.send(await carts.readCarts());
});

router.get("/:id", async (req, res) => {
  res.send(await carts.getCartsById(req.params.id));
});

router.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductsInCarts(cartId, productId));
});

export default router;
