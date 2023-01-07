const jwt = require("jsonwebtoken");

//make a verfiy middle ware that will be used to verfiy the token
async function verifytoken(req, res, next) {
  //now getting token from header of req
  const token = req.headers["auth-token"];
  const userid = req.headers["userid"];

  const result = await jwt.verify(token, "myseckey");
  try {
    if (result.userid == userid) {
      next();
    } else {
      res.send({ success: false, message: "access-denied" });
    }
  } catch (ex) {
    res.send({ success: false, message: ex });
  }
}
module.exports = verifytoken;
