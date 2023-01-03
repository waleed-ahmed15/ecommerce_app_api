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

// delete route for category

router.delete("/", async function (req, res) {
  const categoryid = req.body.categoryid;
  const result = await categoryModel.findOneAndDelete({
    categoryid: categoryid,
  });
  if (!result) {
    res.send({ success: false, message: "no category found" });
  } else {
    res.send({ success: true, category: result });
  }
});

// get all categories route
router.get("/", async function (req, res) {
  await categoryModel.find().exec(function (err, categories) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.send({ success: true, data: categories });
    }
  });
});

module.exports = router;
