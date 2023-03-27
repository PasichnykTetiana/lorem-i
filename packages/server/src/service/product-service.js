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
    async getProductByTest(productId) {
        const product = await ProductsModel.findById(productId);
        return {"message222":"22222"};
    }
}

module.exports = new ProductService();
