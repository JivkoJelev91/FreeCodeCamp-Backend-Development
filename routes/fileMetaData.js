const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer();

// POST /api/fileanalyse - handle file upload
router.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

router.get("/fileMetaData", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/fileMetaData.html"));
});

router.get("/fileMetaData.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/fileMetaData.css"));
});



module.exports = router;