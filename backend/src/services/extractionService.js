const path = require("path");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const SUPPORTED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);
const SUPPORTED_IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// Support both CommonJS and ESM builds of pdf-parse.
const extractTextFromPdf = async (buffer) => {
  const { text } = await pdfParse(buffer);
  return text?.trim() ?? "";
};

const extractTextFromImage = async (buffer) => {
  const {
    data: { text },
  } = await Tesseract.recognize(buffer, "eng");
  return text?.trim() ?? "";
};

const resolveFileCategory = (file) => {
  const mimetype = file.mimetype?.toLowerCase();
  const extension = path.extname(file.originalname || "").toLowerCase();
  const header = file.buffer?.subarray(0, 4)?.toString("utf8");

  if (
    mimetype === "application/pdf" ||
    extension === ".pdf" ||
    header === "%PDF"
  ) {
    return "pdf";
  }

  if (
    SUPPORTED_IMAGE_TYPES.has(mimetype) ||
    SUPPORTED_IMAGE_EXTENSIONS.has(extension)
  ) {
    return "image";
  }

  return "unknown";
};

const extractText = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const category = resolveFileCategory(file);

  if (category === "pdf") {
    return extractTextFromPdf(file.buffer);
  }

  if (category === "image") {
    return extractTextFromImage(file.buffer);
  }

  throw new Error("Unsupported file type. Please upload a PDF or image.");
};

module.exports = {
  extractText,
  extractTextFromPdf,
  extractTextFromImage,
};
