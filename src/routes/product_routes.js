const router = require("express").Router();
const productModel = require("../models/product_model");
const productStyleModel = require("../models/product_styles_model");

//add product route
router.post("/", async function (req, res) {
  const productData = req.body;
  const stylesid = [];
  productData.styles.forEach(async function (style) {
    const newstyle = new productStyleModel(style);
    const alreadyExist = await productStyleModel.find({ styleid: style.styleid });
    if (!alreadyExist) {
      newstyle.save(function (err) {
        if (err) {
          res.json({ success: false, error: err, message: "style error" });
          return;
        }
      });
      stylesid.push(newstyle._id);
    }
    stylesid.push(alreadyExist._id);
  });
  productData.styles = stylesid;
  const newproduct = new productModel(productData);
  newproduct.save(function (err) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.json({ success: true, product: newproduct });
    }
  });
});

// get all products;

router.get("/", async function (req, res) {
  await productModel
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

// update product route
router.put("/", async function (req, res) {
  const productData = req.body;
  const result = await productModel.findOneAndUpdate(
    { productid: productData.productid },
    productData
  );
  if (!result) {
    res.json({ success: false, error: "no such product found" });
  } else {
    res.json({ success: true, messaage: "product updated successfully" });
  }
});

module.exports = router;
