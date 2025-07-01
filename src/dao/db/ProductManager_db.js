import ProductModel from "../models/products.model.js";

class ProductManager {
  constructor() {
    this.model = ProductModel;
  }

  async getProducts() {
    const products = await this.model.find().lean();
    products.forEach((product) => {
      console.log(`el id es ${product._id.toString()}`);
    });
    return products;
  }

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
      !category ||
      !thumbnail
    ) {
      return "todos los campos son obligatorios";
    }

    // Validar que el código sea único
    let codeExist = await this.model.findOne({ code: code });
    if (codeExist) {
      return "el código del producto ya existe";
    }

    const newProduct = new ProductModel({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail: thumbnail || [],
    });
    const savedProduct = await newProduct.save();
    return savedProduct;
  };

  async getProductsById(id) {
    return await this.model.findById(id).lean();
  }

  async updateProducts(id, product) {
    return await this.model.findByIdAndUpdate(id, product, { new: true });
  }

  async deleteProductsById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default ProductManager;
