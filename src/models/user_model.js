const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userid: { type: String, required: true, unique: true },
  fullname: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String },
  token: { type: String, default: "" },
  address: { type: String },
  country: { type: String },
  city: { type: String },
  pincode: { type: String },
  addon: { type: Date, default: Date.now },
});

const usermodel = model("User", userSchema);
module.exports = usermodel;
