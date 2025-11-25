require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { extractText } = require("./services/extractionService");
const { analyzeContent } = require("./services/analysisService");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGINS = (process.env.FRONTEND_URLS || "")
  .split(",")
  .filter(Boolean);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

app.use(
  cors({
    origin: FRONTEND_ORIGINS.length ? FRONTEND_ORIGINS : true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

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

app.use((err, _req, res, _next) => {
  console.error("[app:error]", err);
  res.status(500).json({ message: "Unexpected server error." });
});

// app.listen(PORT, () => {
//   console.log(`API listening on http://localhost:${PORT}`);
// });
