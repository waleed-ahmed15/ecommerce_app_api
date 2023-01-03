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
//multiple files upload route.
router.post("/multiple", upload.array("images"), async function (req, res) {
  const multipleFiles = req.files;
  if (multipleFiles.length == 0 || !multipleFiles) {
    res.json({ success: false, error: "no files uploaded" });
    return;
  }
  const filesURLs = [];
  multipleFiles.forEach(function (uploadedfile) {
    const fileURL = "http://localhost:3003/" + uploadedfile.filename;
    filesURLs.push(fileURL);
  });
  res.json({ success: true, urls: filesURLs });
});

module.exports = router;
