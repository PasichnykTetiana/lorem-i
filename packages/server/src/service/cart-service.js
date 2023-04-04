const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const cartModel = require("../models/cart-model");
const mongoose = require("mongoose");

class CartService {
  async updateCartItem(productId, refreshToken, quantityDelta) {
    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.BadRequest("User is not found");
    }

    const userId = userData.id;
    const productObjectId = mongoose.Types.ObjectId(productId);

    let cart = await cartModel
        .findOne({ user: userId })
        .populate("products.product");

    if (cart) {
      const productIndex = cart.products.findIndex((p) =>
          p.product.equals(productObjectId)
      );
      if (productIndex !== -1) {
        const newQuantity = cart.products[productIndex].quantity + quantityDelta;
        if (newQuantity > 0) {
          cart.products[productIndex].quantity = newQuantity;
        } else {
          cart.products.splice(productIndex, 1);
        }
        await cart.save();
      } else if (quantityDelta > 0) {
        cart.products.push({ product: productObjectId, quantity: quantityDelta });
        await cart.save();
      }
    } else if (quantityDelta > 0) {
      cart = await cartModel.create({
        user: userId,
        products: [{ product: productObjectId, quantity: quantityDelta }],
      });
    }
  }
  // async addToCart(productId, refreshToken) {
  //   const userData = tokenService.validateRefreshToken(refreshToken);
  //
  //   if (!userData) {
  //     throw ApiError.BadRequest("User is not found");
  //   }
  //
  //   const userId = userData.id;
  //   const productObjectId = mongoose.Types.ObjectId(productId);
  //
  //   let cart = await cartModel
  //     .findOne({ user: userId })
  //     .populate("products.product");
  //
  //   if (cart) {
  //     const productIndex = cart.products.findIndex((p) =>
  //       p.product.equals(productObjectId)
  //     );
  //     if (productIndex !== -1) {
  //       cart.products[productIndex].quantity++;
  //     } else {
  //       cart.products.push({ product: productObjectId, quantity: 1 });
  //     }
  //     await cart.save();
  //   } else {
  //     cart = await cartModel.create({
  //       user: userId,
  //       products: [{ product: productObjectId, quantity: 1 }],
  //     });
  //   }
  // }

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
