const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const cartModel = require("../models/cart-model");
const mongoose = require('mongoose');
const UserModel = require("../models/user-model");

class CartService {
    async addToCart(productId, refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken);

        if (!userData) {
            throw ApiError.BadRequest("User is not found");
        }

        const userId = userData.id;
        const productObjectId = mongoose.Types.ObjectId(productId);

        const cart = await cartModel.findOne({ user: userId });
        if (cart) {
            await cartModel.updateOne({ _id: cart._id }, { $addToSet: { products: productObjectId } });
            return cart;
        } else {
            const newCart = await cartModel.create({ user: userId, products: [productObjectId] });
            return newCart;
        }
    }
    async getCart(refreshToken){
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