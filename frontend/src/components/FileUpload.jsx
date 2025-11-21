import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState("");
  const [prettyText, setPrettyText] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const isPDF = file.type === "application/pdf";

    const url = isPDF
      ? "http://localhost:5000/api/extract/pdf"
      : "http://localhost:5000/api/extract/image";

    try {
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRawText(res.data.rawText);
      setPrettyText(res.data.prettyText);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="main-wrapper">
      <h1 className="title">Social Media Content Analyzer</h1>

      <div className="two-box-wrapper">
        {/* LEFT BOX */}
        <div className="box">
          <h2>Upload File Input</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />

          <button onClick={uploadFile} className="upload-btn">
            Upload & Extract
          </button>

          {loading && <p>Extracting...</p>}

          {rawText && (
            <textarea value={rawText} readOnly className="output-text" />
          )}
        </div>

        {/* RIGHT BOX */}
        <div className="box">
          <h2>Gemini Output</h2>

          {prettyText ? (
            <textarea value={prettyText} readOnly className="output-text" />
          ) : (
            <p className="placeholder">Gemini output will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
