require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const extractRoutes = require("./routes/extractRoutes");
const { extractText } = require("./src/services/extractionService");
const { analyzeContent } = require("./src/services/analysisService");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});
// Routes
app.use("/api/extract", extractRoutes);

app.post("/api/analyze", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Please upload a PDF or image file." });
    }

    const extractedText = await extractText(req.file);

    if (!extractedText) {
      return res
        .status(422)
        .json({ message: "We could not read any text from this document." });
    }

    const analysis = analyzeContent(extractedText);

    res.json({
      rawText: extractedText,
      analysis,
    });
  } catch (error) {
    console.error("[analyze:error]", error);
    res.status(500).json({
      message: error.message || "Something went wrong during analysis.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
