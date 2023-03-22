const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false },
});

module.exports = model("Product", ProductSchema);