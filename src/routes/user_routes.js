// imported router from express and usermodel as we will need them to writre routes for user.
// bycrypt is used for encryption and decryption of password

const router = require("express").Router();
const UserModel = require("./../models/user_model");
const bcrypt = require("bcrypt");

router.post("/createaccount", async function (req, res) {
  const userData = req.body;
  const password = userData.password;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  userData.password = hashpassword;
  const newUser = new UserModel(userData);
  await newUser.save(function (err) {
    if (err) {
      res.json({ success: false, error: err });
      return;
    }
    res.json({ success: true, data: newUser });
  });
});
module.exports = router;
