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

//get orders for specific user using user id;
router.get("/:userid", async function (req, res) {
  const userid = req.params.userid;
  await OrderModel.find({ user: userid })
    .populate("user")
    .exec(function (err, docs) {
      if (err) {
        res.send({ success: false, error: err });
      } else {
        res.send({ success: true, data: docs });
      }
    });
});

//route for updating order status

router.put("/orderstatus", async function (req, res) {
  const orderdata = req.body;
  console.log(orderdata);
  console.log(orderdata.orderstatus);
  const updated = await OrderModel.findOneAndUpdate(
    { orderid: orderdata.orderid },
    { orderstatus: orderdata.orderstatus }
  );
  console.log(updated);
  if (!updated) {
    res.send({ success: false, data: "order not found" });
    return;
  } else {
    res.send({ success: true, data: orderdata });
  }
});
module.exports = router;
