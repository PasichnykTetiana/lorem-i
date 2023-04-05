const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  sessionId: { type: String },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

module.exports = model("Cart", CartSchema);
