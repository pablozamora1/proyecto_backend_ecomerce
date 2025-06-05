import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const productsAll = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/models/carts.json";
  }

  readCarts = async () => {
    let Carts = await fs.readFile(this.path, "utf-8");
    const arrayCarts = JSON.parse(Carts);
    return arrayCarts;
  };

  writeCarts = async (carts) => {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  };

  cartsExist = async (id) => {
    let Carts = await this.readCarts();
    return Carts.find((item) => item.id === id);
  };

  addCarts = async () => {
    let cartsOld = await this.readCarts();
    let id = nanoid(3);
    let cartConcat = [{ id: id, products: [] }, ...cartsOld];
    await this.writeCarts(cartConcat);
    return "Carrito agregado";
  };

  getCartsById = async (id) => {
    let cartsById = this.cartsExist(id);
    if (!cartsById) return "carrito no encontrado";
    return cartsById;
  };

  addProductsInCarts = async (cartId, productId) => {
    let cartsById = await this.cartsExist(cartId);
    if (!cartsById) return "carrito no encontrado";
    let productsById = await productsAll.productExist(productId);
    if (!productsById) return "producto no encontrado";
    let cartsAll = await this.readCarts();
    let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

    if (cartsById.products.some((prod) => prod.id === productId)) {
      let productInCart = cartsById.products.find(
        (prod) => prod.id === productId
      );
      productInCart.quantity++;

      let cartsConcat = [productInCart, ...cartFilter];
      console.log(pro);
      // await this.writeCarts(cartsConcat);
      console.log(cartsConcat);
      // console.log(cartFilter);
      return "producto sumado al carrito";
    }

    let cartsConcat = [
      { id: cartId, products: [{ id: productsById.id, quantity: 1 }] },
      ...cartFilter,
    ];
    await this.writeCarts(cartsConcat);
    return "producto agregado al carrito";
  };
}

export default CartManager;
