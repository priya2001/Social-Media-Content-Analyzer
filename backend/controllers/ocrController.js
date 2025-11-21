const fs = require('fs');
const path = require('path');
const { createWorker } = require('tesseract.js');
const sharp = require('sharp');

const worker = createWorker({
  // logger: m => console.log(m) // uncomment for debug logs
});

// NOTE: initialize worker once
let workerInitialized = false;
async function initWorker() {
  if (!workerInitialized) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    workerInitialized = true;
  }
}

exports.extractFromImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = path.resolve(req.file.path);

    // Convert input to PNG buffer using sharp to avoid "pixReadStream" issues
    // Use sharp to read any image (jpg, jpeg, gif, webp, tiff) and convert to png buffer
    const imageBuffer = await sharp(filePath)
      .ensureAlpha()
      .png()
      .toBuffer();

    // initialize tesseract worker once
    await initWorker();

    // Recognize from buffer
    const { data } = await worker.recognize(imageBuffer);
    // data.text contains extracted text
    res.json({
      filename: req.file.filename,
      text: data.text || '',
      confidence: data.confidence || null
    });
  } catch (err) {
    console.error('extractFromImage error:', err);
    res.status(500).json({ error: 'Failed to do OCR', details: err.message });
  }
};

// optional: graceful worker close if your app exits (not mandatory)
process.on('SIGINT', async () => {
  try {
    if (workerInitialized) {
      await worker.terminate();
    }
  } catch (e) {}
  process.exit();
});
