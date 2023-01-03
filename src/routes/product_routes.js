const router = require("express").Router();
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

module.exports = router;
