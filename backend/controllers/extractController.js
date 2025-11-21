// ==============================
// controllers/extractController.js
// ==============================
import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import fs from "fs";
import { rewriteWithGemini } from "../services/geminiService.js";

// For Images
export const extractTextFromImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await Tesseract.recognize(req.file.path, "eng", {
      logger: (m) => console.log(m),
    });

    const rawText = result.data.text;
    const prettyText = await rewriteWithGemini(rawText);

    res.json({ rawText, prettyText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image extraction failed" });
  }
};

// For PDFs
export const extractTextFromPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const data = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(data);

    const rawText = pdfData.text;
    const prettyText = await rewriteWithGemini(rawText);

    res.json({ rawText, prettyText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF extraction failed" });
  }
};
