//import multer

// set storage
// storage has 2 parameters destination and filename

const multer = require("multer");
const uuid = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    const orignalfileName = file.originalname;
    const filenameArray = orignalfileName.split(".");
    const extension = filenameArray[filenameArray.length - 1];
    const newfileName = uuid.v1() + "." + extension;
    callback(null,newfileName);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
