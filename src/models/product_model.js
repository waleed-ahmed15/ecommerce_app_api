const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  productid: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  styles: { type: Array, default: [] },
  price: { type: Number, required: true },
  createdon: { type: Date, default: Date.now },
});
const productModel = model("Product", ProductSchema);
module.exports = productModel;
