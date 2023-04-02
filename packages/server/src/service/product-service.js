const ProductsModel = require("../models/product-model");

class ProductService {
  async getProducts() {
    const products = await ProductsModel.find();
    return products;
  }

  async getProductById(productId) {
    const product = await ProductsModel.findById(productId);
    return product;
  }
}

module.exports = new ProductService();
