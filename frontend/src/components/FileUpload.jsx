import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
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

      setText(res.data.text);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload & Extract</button>

      {loading && <p>Extracting text...</p>}
      {text && <textarea rows={15} value={text} readOnly />}
    </div>
  );
}

export default FileUpload;
