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

module.exports = router;
