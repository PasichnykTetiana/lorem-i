const ProductsService = require("../service/product-service");

class ProductController {
  async getProducts(req, res, next) {
    try {
      const we = await ProductsService.getProducts();
      return res.json(we);
    } catch (e) {
      next(e);
    }
  }

  async getProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await ProductsService.getProductById(productId);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductController();
