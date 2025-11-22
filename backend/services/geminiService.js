const fetch = require("node-fetch");

const rewriteWithGemini = async (inputText) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log(" GEMINI_API_KEY missing");
    return "API Key missing";
  }

  const body = {
    contents: [
      {
        parts: [
          {
            text:
              "Rewrite this text into a clean, highly formatted, readable, well-structured professional document. Improve grammar, clarity, spacing, bullet points, headings.\n\nInput:\n" +
              inputText,
          },
        ],
      },
    ],
  };

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  console.log(" GEMINI RAW RESPONSE:", JSON.stringify(data, null, 2));

  // ===============  SUPER SAFE EXTRACTION  ===================
  try {
    if (data?.candidates?.[0]?.content?.parts) {
      const parts = data.candidates[0].content.parts;
      const text = parts.map((p) => p.text).join("\n");

      if (text.trim().length > 0) return text;
    }

    return " Gemini returned no formatted output";
  } catch (err) {
    return " Error reading Gemini response";
  }
};

module.exports = { rewriteWithGemini };
