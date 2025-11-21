project:
  name: "Social Media Content Analyzer"
  description: >
    A MERN-based application that extracts text from PDF and image files using
    PDF parsing (pdf-parse) and OCR (Tesseract.js). It allows users to upload
    documents via drag-and-drop and converts scanned or digital documents into
    readable text.

features:
  document_upload:
    - "Upload PDF files"
    - "Upload image files (JPG, PNG, scanned documents)"
    - "Drag-and-drop interface"
    - "File type validation on frontend and backend"

  text_extraction:
    pdf_parsing:
      library: "pdf-parse"
      description: "Extracts text from PDF files while maintaining formatting."

    ocr:
      library: "tesseract.js"
      description: "Extracts text from scanned image files."

  additional_features:
    - "Loading indicators while extraction is happening"
    - "Responsive UI built using React + Vite"
    - "Basic and helpful error handling"
    - "Clean project structure following MERN practices"

tech_stack:
  frontend:
    framework: "React 19"
    build_tool: "Vite"
    dependencies:
      - "axios"
      - "react"
      - "react-dom"
    dev_tools:
      - "ESLint"
      - "Vite Preview"
    scripts:
      dev: "npm run dev"
      build: "npm run build"
      preview: "npm run preview"

  backend:
    environment: "Node.js + Express.js"
    dependencies:
      - "express"
      - "multer"
      - "pdf-parse"
      - "tesseract.js"
      - "sharp"
      - "cors"
    dev_dependencies:
      - "nodemon"
    scripts:
      start: "npm start"
      developer: "npm run dev"

project_structure:
  backend:
    - "server.js"
    - "routes/"
    - "controllers/"
    - "uploads/"
    - "package.json"
  frontend:
    - "src/components/"
    - "src/App.jsx"
    - "package.json"

api:
  upload_api:
    endpoint: "/api/upload"
    method: "POST"
    request_type: "multipart/form-data"
    response_example: |
      {
        "success": true,
        "type": "pdf or image",
        "text": "Extracted text here..."
      }

run_locally:
  steps:
    - step: "Clone the repository"
      command: "git clone <your-repository-url>"
    - step: "Navigate to project folder"
      command: "cd Social-Media-Content-Analyzer"

  backend_setup:
    - "cd backend"
    - "npm install"
    - "npm run dev"

  frontend_setup:
    - "cd frontend"
    - "npm install"
    - "npm run dev"

  local_servers:
    frontend: "http://localhost:5173"
    backend: "http://localhost:5000"

testing:
  supported_files:
    - "PDF documents"
    - "Scanned images"
    - "Posters"
    - "Screenshots"
    - "Notes (depends on clarity)"
  notes: "OCR accuracy varies based on lighting, clarity, and handwriting."

requirements_checklist:
  PDF_upload: true
  Image_upload: true
  Drag_and_drop: true
  PDF_parsing: true
  OCR_extraction: true
  Loading_UI: true
  Error_handling: true
  Documentation: true

license:
  type: "MIT License"
