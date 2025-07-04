import mongoose from "mongoose";

const cartCollection = "Carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

// --- Middleware para poblar los productos ---
cartSchema.pre(["find", "findOne"], function () {
  this.populate("products.product");
});

const CartModel = mongoose.model(cartCollection, cartSchema);

export default CartModel;
