const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}]
});

module.exports = model("Cart", CartSchema);