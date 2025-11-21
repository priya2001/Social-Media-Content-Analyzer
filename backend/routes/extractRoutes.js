const express = require("express");
const multer = require("multer");
const path = require("path");
const extractTextController = require("../controllers/extractController");

const router = express.Router();

// ================= Multer Storage ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ROUTES (frontend field name must be "file")
router.post("/pdf", upload.single("file"), extractTextController.extractPDF);
router.post("/image", upload.single("file"), extractTextController.extractImage);

module.exports = router;




