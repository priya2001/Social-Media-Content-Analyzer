# Social Media Content Analyzer

A MERN-based application that extracts text from PDF files and image files using PDF parsing and OCR (Tesseract.js).  
This tool helps analyze documents, scanned content, and social media screenshots by converting them into readable text.

---

## 🚀 Features

### 📤 Document Upload
- Upload PDF files
- Upload Image files (JPG, PNG, scanned docs)
- Drag-and-drop upload support
- File validation on both frontend and backend

### 📝 Text Extraction
#### ✔ PDF Parsing
Uses **pdf-parse** to extract text from PDF files.

#### ✔ OCR (Optical Character Recognition)
Uses **tesseract.js** to extract text from images.

### 💡 Additional Features
- Loading indicators while processing
- Clean UI built with React + Vite
- Error handling for invalid files or extraction failures
- Responsive design

---

## 🛠 Tech Stack

### 🎨 Frontend
- React 19
- Axios
- Vite
- Modern component-based UI
- Drag-and-drop upload implemented manually

**Frontend Scripts**
npm run dev
npm run build
npm run preview

markdown
Copy code

---

### 🧰 Backend
- Node.js
- Express.js
- Multer (file upload)
- pdf-parse (PDF text extraction)
- tesseract.js (Image OCR)
- Sharp (image optimization)
- CORS enabled
- Nodemon for development

**Backend Scripts**
npm start
npm run dev

yaml
Copy code

---

## 📂 Project Structure

Social-Media-Content-Analyzer
│
├── backend
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── uploads/
│ └── package.json
│
└── frontend
├── src/
│ ├── components/
│ └── App.jsx
└── package.json

yaml
Copy code

---

## 🌐 API Endpoint

### POST /api/upload

Uploads a document and returns extracted text.

**Response Example**
{
"success": true,
"type": "pdf" or "image",
"text": "Extracted text here..."
}

yaml
Copy code

---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository
git clone <your-repository-url>
cd Social-Media-Content-Analyzer

shell
Copy code

### 2️⃣ Install dependencies

#### Backend:
cd backend
npm install

shell
Copy code

#### Frontend:
cd ../frontend
npm install

shell
Copy code

### 3️⃣ Start the servers

#### Start Backend:
npm run dev

shell
Copy code

#### Start Frontend:
npm run dev

yaml
Copy code

Frontend → http://localhost:5173  
Backend → http://localhost:5000  

---

## 🧪 Testing

Upload:
- PDFs  
- Scanned documents  
- Social media screenshots  
- Posters  
- Notes (OCR accuracy depends on clarity)

---

## ✔ Requirements Checklist

| Requirement | Status |
|------------|--------|
| PDF Upload | ✔ Completed |
| Image Upload | ✔ Completed |
| Drag and Drop | ✔ Completed |
| PDF Parsing | ✔ Using pdf-parse |
| OCR | ✔ Using tesseract.js |
| Loading UI | ✔ Yes |
| Error Handling | ✔ Yes |
| Documentation | ✔ Yes |

---

## 📜 License
MIT License


