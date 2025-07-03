import ProductManager from "./ProductManager_db.js";
import CartModel from "../models/cart.model.js";

const productsAll = new ProductManager();

class CartManager {
  constructor() {
    this.model = CartModel;
  }
  getCart = async () => {
    try {
      const carts = await this.model.find().lean();
      return carts;
    } catch (error) {
      throw new Error("Error al obtener los carritos");
    }
  };

  writeCarts = async (carts) => {
    try {
      const savedCarts = await this.model.save(carts);
      return savedCarts;
    } catch (error) {
      throw new Error("Error al guardar los carritos");
    }
  };

  cartsExist = async (_id) => {
    let Carts = await this.model.findById(_id).lean();
    if (!Carts) return false;
    return Carts;
  };

  getCartsById = async (_id) => {
    let cartsById = this.cartsExist(_id);
    if (!cartsById) return "carrito no encontrado";
    return cartsById;
  };

  addCarts = async () => {
    let cartsOld = await this.getCart();

    let cartConcat = [{ products: [] }, ...cartsOld];
    await this.writeCarts(cartConcat);
    return "Carrito agregado";
  };

  addProductsInCarts = async (cartId, productId) => {
    let cartsById = await this.cartsExist(cartId);
    if (!cartsById) return "carrito no encontrado";
    let productsById = await productsAll.productExist(productId);
    if (!productsById) return "producto no encontrado";
    let cartsAll = await this.getCart();
    let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

    if (cartsById.products.some((prod) => prod.id === productId)) {
      let productInCart = cartsById.products.find(
        (prod) => prod.id === productId
      );
      productInCart.quantity++;
      let cartsConcat = [
        { id: cartId, products: [productInCart] },
        ...cartFilter,
      ];

      await this.writeCarts(cartsConcat);
      return "producto sumado al carrito";
    }

    cartsById.products.push({ id: productsById.id, quantity: 1 });

    let cartsConcat = [cartsById, ...cartFilter];
    await this.writeCarts(cartsConcat);
    return "producto agregado al carrito";
  };
}

export default CartManager;
