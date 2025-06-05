import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
const product = new ProductManager();
const router = Router();

//---------------------------RUTAS--------------------------------

router.get("/", async (req, res) => {
  res.send(await product.getProducts());
});
router.post("/", async (req, res) => {
  const newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductsById(id));
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await product.updateProducts(id, updateProduct));
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProductsById(id));
});

export default router;
