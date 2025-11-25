# Social Media Content Analyzer

An end-to-end MERN reference application that lets marketers drop a PDF or screenshot of draft social copy, extracts the text, and returns engagement-focused insights (sentiment, readability, hashtag usage, suggestions, etc.).

The project is split into:

- `backend/`: Node + Express API that handles uploads, extracts text from PDFs (via `pdf-parse`) or images (via `tesseract.js`), and runs heuristic analysis.
- `frontend/`: React (Vite) client that offers drag-and-drop uploads, loading states, and renders extracted text, metrics, and recommendations.

## Features

- Drag-and-drop or file picker upload for PDFs and common image formats (PNG/JPG/WEBP).
- OCR support through Tesseract for scanned/image-based documents.
- Text analysis heuristics: word/character counts, Flesch reading ease, sentiment, hashtag & mention detection, CTA hints.
- Human-readable suggestions tailored to common social media best practices.
- Basic error handling, input restrictions (10 MB limit), and descriptive loading states.

## Prerequisites

- Node.js >= 18
- npm >= 9
- (Optional) MongoDB or any datastore if you plan to persist analysis history. The current build is stateless.

## Local Development

### 1. Backend API

```bash
cd backend
npm install
cp env.example .env    # Manually create .env on Windows if copy fails
npm run dev
```

Environment variables (`backend/env.example`):

| Key            | Description                                   | Default             |
|----------------|-----------------------------------------------|---------------------|
| `PORT`         | API port                                      | `5000`              |
| `FRONTEND_URLS`| Comma-separated allowed origins for CORS      | `http://localhost:5173` |

### 2. Frontend client

```bash
cd frontend
npm install
cp env.example .env    # Set VITE_API_URL if deploying separately
npm run dev            # Opens http://localhost:5173
```

`frontend/env.example` contains `VITE_API_URL` (default `http://localhost:5000`).

### 3. Build & Deploy

- **Backend**: Deploy to Render, Railway, or Azure App Service. Set the same environment variables as above. Render example:
  - Build command: `npm install`
  - Start command: `npm run start`
- **Frontend**: Deploy to Netlify, Vercel, or Azure Static Web Apps.
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Environment variable: `VITE_API_URL` pointing to the hosted API.

Once both sides are deployed, capture the live URLs to satisfy the deliverables:

1. Working application URL (hosted frontend hitting the hosted API)
2. GitHub repository containing this source code and README.

## API Reference

### `POST /api/analyze`

| Field      | Type   | Notes                                    |
|------------|--------|------------------------------------------|
| `document` | file   | Required. PDF or image (png/jpg/webp).   |

Response:

```json
{
  "rawText": "string",
  "analysis": {
    "metrics": {
      "wordCount": 123,
      "charCount": 789,
      "sentimentScore": 0.18,
      "readabilityScore": 72,
      "hashtags": ["#launch"],
      "mentions": ["@brand"]
    },
    "summary": "First two sentences …",
    "suggestions": ["Add a CTA", "..."]
  }
}
```

HTTP 4xx/5xx responses include a `message` for display on the frontend.

## Testing & Validation

- `frontend`: `npm run build` ensures the UI compiles. Add component tests (Vitest + Testing Library) as next steps.
- `backend`: Current project is lightweight; consider adding Jest tests that mock the extraction service for future robustness.

## Future Enhancements

- Persist previous analyses with MongoDB so users can revisit insights.
- Hook up third-party NLP APIs (OpenAI, AWS Comprehend) for richer suggestions.
- Support multi-page PDFs with highlights or inline annotations.
- OAuth login for multi-user history and usage tracking.

## Troubleshooting

- **Large files**: increase `multer` `fileSize` limit in `src/server.js`.
- **Tesseract performance**: cache workers or move OCR to a worker queue if throughput grows.
- **CORS issues**: verify `FRONTEND_URLS` matches your deployed frontend origin exactly (protocol + host).

Feel free to fork and iterate—the codebase intentionally stays small and approachable so you can plug in more advanced ML/NLP services later.


