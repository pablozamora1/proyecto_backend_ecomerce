import { Router } from "express";
import ProductManager from "../dao/db/ProductManager_db.js";
const product = new ProductManager();
const router = Router();

//---------------------------RUTAS--------------------------------

// GET /api/products?limit=
router.get("/", async (req, res) => {
  let allProducts = await product.getProducts();
  let limit = parseInt(req.query.limit);
  if (limit) {
    const productLimit = allProducts.slice(0, limit);
    return res.send(productLimit);
  } else {
    res.send(await product.getProducts());
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  const newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductsById(id));
});

// PUT /api/products/:id
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await product.updateProducts(id, updateProduct));
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProductsById(id));
});

export default router;
