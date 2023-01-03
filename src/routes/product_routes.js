const router = require("express").Router();
const productModel = require("../models/product_model");
const productmodel = require("../models/product_model");
router.post("/", async function (req, res) {
  const productData = req.body;
  const newproduct = new productmodel(productData);
  newproduct.save(function (err) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.send({ success: true, product: newproduct });
    }
  });
});

// get all products;

router.get("/", async function (req, res) {
  await productmodel
    .find()
    .populate("category")
    .exec(function (error, products) {
      if (error) {
        res.send({ success: false, error: error });
      } else {
        res.send({ success: true, data: products });
      }
    });
});

// delet product route

router.delete("/", async function (req, res) {
  const productid = req.body.productid;
  const result = await productModel.findOneAndDelete({ productid: productid });
  if (!result) {
    res.json({ success: false, message: "no product found" });
  } else {
    res.json({ success: true, product: result });
  }
});
module.exports = router;
