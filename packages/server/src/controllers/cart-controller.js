const cartService = require("../service/cart-service");

class CartController {
  async addToCart(req, res, next) {
    try {
      const productId = req.params.id;
      const { refreshToken } = req.cookies;
      const data = await cartService.addToCart(productId, refreshToken);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  async getCart(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await cartService.getCart(refreshToken);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
