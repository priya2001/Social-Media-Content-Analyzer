const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");
const fs = require("fs");

// ============= IMAGE TEXT EXTRACTION =============
exports.extractImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const result = await Tesseract.recognize(req.file.path, "eng");
    res.json({ text: result.data.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image extraction failed" });
  }
};

// ============= PDF TEXT EXTRACTION =============
exports.extractPDF = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    res.json({ text: pdfData.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF extraction failed" });
  }
};


