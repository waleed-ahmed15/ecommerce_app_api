const router = require("express").Router();
const OrderModel = require("../models/order_model");

// create new order route

router.post("/", async function (req, res) {
  const orderDeitals = req.body;
  const newOrder = new OrderModel(orderDeitals);
  await newOrder.save(function (err) {
    if (err) {
      res.json({ success: false, error: err });
    } else {    
      res.send({ success: true, data: "order created successfully" });
    }
  });
});

module.exports = router;
