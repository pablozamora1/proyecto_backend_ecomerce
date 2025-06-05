import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    const arrayProducts = JSON.parse(products);
    return arrayProducts;
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  productExist = async (id) => {
    let products = await this.readProducts();
    return products.find((item) => item.id === id);
  };

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid(3);
    let productAll = [...productsOld, product];
    await this.writeProducts(productAll);
    return "producto agregado";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProductsById = async (id) => {
    let productsById = this.productExist(id);
    if (!productsById) return "producto no encontrado";
    return productsById;
  };

  updateProducts = async (id, product) => {
    let productsById = this.productExist(id);
    if (!productsById) return "producto no encontrado";
    await this.deleteProductsById(id);
    let productsOld = await this.readProducts();
    let products = [{ ...product, id: id }, ...productsOld];
    await this.writeProducts(products);
    return "producto actualizado";
  };

  deleteProductsById = async (id) => {
    let products = await this.readProducts();
    let productExist = products.some((item) => item.id === id);
    if (productExist) {
      let productFilter = products.filter((item) => item.id != id);
      await this.writeProducts(productFilter);
      return "producto eliminado";
    } else {
      return "producto no encontrado";
    }
  };
}

export default ProductManager;
