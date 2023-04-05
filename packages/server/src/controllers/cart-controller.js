const cartService = require("../service/cart-service");

class CartController {
  async addToCart(req, res, next) {
    const { id } = req.params;
    const { refreshToken } = req.cookies;
    const cartId = req.cookies.cartId;
    try {
      const cart =  await cartService.updateCartItem(id, refreshToken,cartId, 1);
      res.cookie("cartId", cart._id, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
      next(err);
    }
  }

  async removeFromCart(req, res, next) {
    const { id } = req.params;
    const { refreshToken } = req.cookies;
    const cartId = req.cookies.cartId;
    try {
      await cartService.updateCartItem(id, refreshToken, cartId, -1);
      res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
      next(err);
    }
  }

  async getCart(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const cartId = req.cookies.cartId;
      const data = await cartService.getCart(refreshToken, cartId);

      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
