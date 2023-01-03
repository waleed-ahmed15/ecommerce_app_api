const router = require("express").Router();

const categoryModel = require("../models/category_model");

router.post("/", async function (req, res) {
  const categoryData = req.body;
  const newCategory = new categoryModel(categoryData);
  await newCategory.save(function (err) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.send({ success: true, category: newCategory });
    }
  });
});

module.exports = router;
