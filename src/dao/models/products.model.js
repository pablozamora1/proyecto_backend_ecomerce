import mongoose from "mongoose";

const productsCollection = "Products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: [String] },
});

const ProductModel = mongoose.model(productsCollection, productSchema);

export default ProductModel;
