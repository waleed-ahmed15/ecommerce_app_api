const { Schema, model } = require("mongoose");
const uuid = require("uuid");
const orderSchema = new Schema({
  orderid: { type: String, default: uuid.v1() },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: { type: Array, default: [] },
  addedon: { type: Date, default: Date.now() },
  oderstatus: { type: Number, default: 0 }, //0 present order place ..1 presents order shipped
});
const oderModel = model("Order", orderSchema);

module.exports = oderModel;
