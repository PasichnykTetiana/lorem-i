const cartService = require("../service/cart-service");

class CartController {
  async addToCart(req, res, next) {
    const { id } = req.params;
    const { refreshToken } = req.cookies;
    try {
      await cartService.updateCartItem(id, refreshToken, 1);
      res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
      next(err);
    }
  }

  async removeFromCart(req, res, next) {
    const { id } = req.params;
    const { refreshToken } = req.cookies;
    try {
      await cartService.updateCartItem(id, refreshToken, -1);
      res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
      next(err);
    }
  }
  // async addToCart(req, res, next) {
  //   try {
  //     const productId = req.params.id;
  //     const { refreshToken } = req.cookies;
  //     const data = await cartService.addToCart(productId, refreshToken);
  //     res.status(200).json(data);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

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
