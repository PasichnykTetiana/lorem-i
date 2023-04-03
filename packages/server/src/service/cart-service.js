const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const cartModel = require("../models/cart-model");
const mongoose = require("mongoose");

class CartService {
  async addToCart(productId, refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.BadRequest("User is not found");
    }

    const userId = userData.id;
    const productObjectId = mongoose.Types.ObjectId(productId);

    let cart = await cartModel.findOne({ user: userId }).populate("products.product");

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.product.equals(productObjectId));
      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: productObjectId, quantity: 1 });
      }
      await cart.save();
    } else {
      cart = await cartModel.create({
        user: userId,
        products: [{ product: productObjectId, quantity: 1 }],
      });
    }

  //   cart.populate("products.product");
  //   const populatedCart = await cart.exec()
  //   const productsWithQuantity = populatedCart.products.map(p => ({
  //     name: p.product.name,
  //     quantity: p.quantity
  //   }));
  //
  //   return { products: productsWithQuantity };
  }

  async getCart(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw ApiError.BadRequest("User is not found");
    }
    const userId = userData.id;
    const cart = await cartModel.findOne({ user: userId });
    return cart;
  }
}

module.exports = new CartService();
