// imported router from express and usermodel as we will need them to writre routes for user.
// bycrypt is used for encryption and decryption of password

const router = require("express").Router();
const usermodel = require("../models/user_model");
const bcrpyt = require("bcrypt");
const CartModel = require("../models/cart_model");
const CartItemModel = require("../models/cart_item_model");
const uuid = require("uuid");
const { populate } = require("../models/product_styles_model");
router.post("/createaccount", async function (req, res) {
  const userData = req.body;
  const password = userData.password;
  const salt = await bcrpyt.genSalt(10);
  const hashedpassword = await bcrpyt.hash(password, salt);
  userData.password = hashedpassword;
  const newUser = new usermodel(userData);

  newUser.save(function (err) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      res.send({ success: true, data: userData });
    }
  });
});
router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const founduser = await usermodel.findOne({ email: email });
  if (!founduser) {
    res.send({ success: false, error: "user not found" });
    return;
  }
  const correctpassword = await bcrpyt.compare(founduser.password, password);
  if (!correctpassword) {
    res.send({ success: false, error: "incorrect password" });
    return;
  }
  res.send({ success: true, error: "user found and login successful" });
});
router.get("/:userid", async function (req, res) {
  const userid = req.params.userid;
  const userfound = await usermodel.findOne({ userid: userid });
  if (!userfound) {
    res.send({ success: false, error: "user not found" });
    return;
  }
  res.send({ success: true, userData: userfound });
});

// view cart route==================
router.get("/:cartid/viewcart", async function (req, res) {
  const cartid = req.params.cartid;
  // const cartfound = await CartModel.findOne({ cartid: cartid }).populate(
  //   "items"
  // );
  const cartfound = await CartModel.findOne({ cartid: cartid }).populate({
    path: "items",
    populate: {
      path: "product",
      path: "style",
    },
  });

  if (!cartfound) {
    res.send({ success: false, error: "cart not found" });
    return;
  }
  res.send({ success: true, Data: cartfound });
});

// update user route

router.put("/", async function (req, res) {
  const userData = req.body;
  const result = await usermodel.findOneAndUpdate(
    { userid: userData.userid },
    userData
  );
  if (!result) {
    res.json({ success: false, error: "no such user found" });
  } else {
    res.json({ success: true, messaage: "user updated successfully" });
  }
});

// add to cart route for user.

router.post("/:userid/addtocart", async function (req, res) {
  // cart model is required for adding to cart;
  //we will check if cart already exist for the user or not.
  const userid = req.params.userid;
  const cartexist = await CartModel.findOne({ userid: userid });
  let cartItemDetails = req.body;

  if (!cartexist) {
    const newCart = new CartModel({ userid: userid });
    await newCart.save(function (err) {
      if (err) {
        res.send({ sucess: false, error: err });
        return;
      }
    });
    cartItemDetails.cartid = newCart.cartid;
    // console.log(newCart.cartid);
  } else {
    cartItemDetails.cartid = cartexist.cartid;
    // console.log(cartexist.cartid);
  }
  // console.log(uuid.v1());
  // console.log(cartItemDetails.cartid);

  const newcartItem = new CartItemModel(cartItemDetails);
  await newcartItem.save(async function (err) {
    if (err) {
      res.send({ success: false, error: err });
    } else {
      await CartModel.findOneAndUpdate(
        { cartid: newcartItem.cartid },
        { $push: { items: newcartItem._id } }
      );
      res.send({ success: true, data: newcartItem });
    }
  });
});

//delete from cart route

router.delete("/:userid/removefromcart", async function (req, res) {
  const userid = req.params.userid;
  const cartItemdetails = req.body;
  const updatedCart = await CartModel.findOneAndUpdate(
    { userid: userid },
    { $pull: { items: cartItemdetails.itemid } }
  );
  if (!updatedCart) {
    res.send({ success: false, message: "cart not found" });
  } else {
    res.send({ success: true, message: "item removed" });
  }
});
module.exports = router;

//update product quantity in cart route

router.post("/:userid/cartitemquantity", async function (req, res) {
  //fist we will find the item by its id
  const itemDetails = req.body;
  const itemUpdated = await CartItemModel.findOneAndUpdate(
    { cartitemid: itemDetails.cartitemid },
    { quantity: itemDetails.quantity }
  );
  if (itemUpdated) {
    res.status(200).json({
      success: true,
      message: "quantity updated successfully",
    });
  } else {
    res
      .status(404)
      .send({ success: false, message: "failed to updated quantity" });
  }
});
