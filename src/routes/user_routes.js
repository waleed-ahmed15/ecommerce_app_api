// imported router from express and usermodel as we will need them to writre routes for user.
// bycrypt is used for encryption and decryption of password

const router = require("express").Router();
const usermodel = require("../models/user_model");
const bcrpyt = require("bcrypt");

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

module.exports = router;
