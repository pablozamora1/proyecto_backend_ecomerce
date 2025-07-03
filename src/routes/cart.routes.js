import { Router } from "express";
import CartManager from "../dao/db/CartManager_db.js";
const carts = new CartManager();
const router = Router();

router.get("/", async (req, res) => {
  res.send(await carts.getCart());
});

router.get("/:id", async (req, res) => {
res.send(await carts.getCartsById(req.params._id));
});

router.post("/", async (req, res) => {
  res.send(await carts.addCarts());
});

router.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductsInCarts(cartId, productId));
});

export default router;
