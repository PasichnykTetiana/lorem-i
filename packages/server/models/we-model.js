const { Schema, model } = require("mongoose");

const WeSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  photo: { type: String, required: false },
});

module.exports = model("We", WeSchema);
