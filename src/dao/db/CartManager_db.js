import ProductManager from "./ProductManager_db.js";
import CartModel from "../models/cart.model.js";

const productsAll = new ProductManager();

class CartManager {
  async getCart() {
    try {
      const carts = await CartModel.find().lean();
      return carts;
    } catch (error) {
      console.error("Error fetching carts:", error);
      throw error;
    }
  }

  async getCartsById(id) {
    try {
      const cart = await CartModel.findById(id).lean();
      return cart;
    } catch (error) {
      console.error("Error fetching cart by ID:", error);
      throw error;
    }
  }

  async addCarts() {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error("Error adding new cart:", error);
      throw error;
    }
  }

  async addProductsInCarts(cartId, productId) {
    try {
      const product = await productsAll.getProductsById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const existingProductIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }
  async deleteCart(cartId) {
    try {
      const cart = await CartModel.findByIdAndDelete(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.error("Error deleting cart:", error);
      throw error;
    }
  }
  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
      } else {
        throw new Error("Product not found in cart");
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      throw error;
    }
  }
}

export default CartManager;
