const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const cartModel = require("../models/cart-model");
const mongoose = require("mongoose");
const uuid = require("uuid");

class CartService {
  async updateCartItem(productId, refreshToken, cartId, quantityDelta) {
    let cart;
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    let userId;
    if (userData) {
      userId = userData.id;
    }

    if (cartId) {
      cart = await cartModel
        .findOne({ _id: cartId })
        .populate("products.product");
    } else if (userId) {
      cart = await cartModel
        .findOne({ user: userId })
        .populate("products.product");
    }

    if (!cart) {
      !userData || !tokenFromDb
        ? (cart = await cartModel.create({
            sessionId: uuid.v4(),
            products: [{ product: productId, quantity: quantityDelta }],
          }))
        : (cart = await cartModel.create({
            user: userId,
            products: [{ product: productId, quantity: quantityDelta }],
          }));
    } else {
      const productObjectId = mongoose.Types.ObjectId(productId);
      const productIndex = cart.products.findIndex((p) =>
        p.product.equals(productObjectId)
      );

      if (productIndex !== -1) {
        const newQuantity =
          cart.products[productIndex].quantity + quantityDelta;
        if (newQuantity > 0) {
          cart.products[productIndex].quantity = newQuantity;
        } else {
          cart.products.splice(productIndex, 1);
        }
      } else if (quantityDelta > 0) {
        cart.products.push({
          product: productObjectId,
          quantity: quantityDelta,
        });
      }

      await cart.save();
    }

    return cart;
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

  async getCart(refreshToken, cartId) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    let cart;
    if (userData) {
      cart = await cartModel.findOne({ user: userData.id });
    }
    if (cartId) {
      cart = await cartModel.findOne({ _id: cartId });
    }

    return cart;
  }
}

module.exports = new CartService();
