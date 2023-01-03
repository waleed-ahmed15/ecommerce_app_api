const router = require("express").Router();
const upload = require("../middlewares/file_upload");

//upload single file route
router.post("/single", upload.single("image"), async function (req, res) {
  const uploadedfile = req.file;
  if (!uploadedfile) {
    res.json({ success: false, error: "no file uploaded" });
  } else {
    res.json({
      success: true,
      url: "http://localhost:3003/" + uploadedfile.filename,
      fileDetails: uploadedfile,
    });
  }
});

module.exports = router;
