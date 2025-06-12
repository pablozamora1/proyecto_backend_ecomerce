import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
    this.product = [];
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    const arrayProducts = JSON.parse(products);
    return arrayProducts;
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product, null, 2));
  };

  productExist = async (id) => {
    let products = await this.readProducts();
    return products.find((item) => item.id === id);
  };

  addProducts = async (newObjet) => {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = newObjet;
    // Validar que todos los campos estén presentes
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      return "todos los campos son obligatorios";
    }

    // Validar que el código sea único
    let products = await this.readProducts();
    let codeExist = products.some((item) => item.code === code);
    if (codeExist) {
      return "el código del producto ya existe";
    }

    const newProduct = {
      id: nanoid(3),
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail: thumbnail || [],
    };

    let productsOld = await this.readProducts();

    let productAll = [...productsOld, newProduct];
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
