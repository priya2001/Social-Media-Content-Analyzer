const express = require("express");
const multer = require("multer");
const path = require("path");
const extractTextController = require("../controllers/extractController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/pdf",
  upload.single("file"),
  extractTextController.extractTextFromPDF
);
router.post(
  "/image",
  upload.single("file"),
  extractTextController.extractTextFromImage
);

module.exports = router;
