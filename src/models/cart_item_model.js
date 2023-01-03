const { Schema, model, SchemaType } = require("mongoose");

const cartItemSchema = new Schema({
  cartitemid: { type: String, required: true, unique: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  style: { type: Schema.Types.ObjectId, ref: "ProductStyle" },
  addedon: { type: Date, default: Date.now },
});
const productModel = model("CartItem", cartItemSchema);
module.exports = productModel;
