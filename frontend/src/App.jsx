import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { analyzeDocument } from './api/client';
import './App.css';

const readableFileSize = (size) => {
  if (!size) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  let value = size;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(1)} ${units[index]}`;
};

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }
    setFile(acceptedFiles[0]);
    setError('');
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxSize: 10 * 1024 * 1024,
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please choose a PDF or image to analyze.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const data = await analyzeDocument(file);
      setResult(data);
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong while analyzing the file.';
      setError(message);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="app-shell">
      <header>
        <p className="eyebrow">Social Content Analyzer</p>
        <h1>Upgrade your post before you publish it</h1>
      </header>

      <section className="upload-panel">
        <div
          className={`dropzone ${isDragActive ? 'active' : ''} ${isDragReject ? 'reject' : ''}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Drop the file here…' : 'Drag & drop a PDF or image, or click to browse'}</p>
          <span>Max 10 MB · Supports PDF, PNG, JPG, and WEBP</span>
        </div>

        {file && (
          <div className="file-pill">
            <div>
              <p>{file.name}</p>
              <small>{readableFileSize(file.size)}</small>
            </div>
            <button type="button" onClick={() => setFile(null)}>
              Remove
            </button>
          </div>
        )}

        <button className="primary-btn" onClick={handleAnalyze} disabled={status === 'loading'}>
          {status === 'loading' ? 'Analyzing…' : 'Analyze content'}
        </button>
        {error && <p className="error">{error}</p>}
      </section>

      {status === 'loading' && <div className="loading-state">Extracting text and running heuristics…</div>}

      {result && (
        <>
          <section className="results-split">
            <div className="panel text-panel">
              <h2>Extracted Text</h2>
              <textarea readOnly value={result.rawText} />
            </div>

            <div className="panel metrics-panel">
              <h2>Metrics</h2>
              <ul className="metrics">
                <li>
                  <span>Words</span>
                  <strong>{result.analysis.metrics.wordCount}</strong>
                </li>
                <li>
                  <span>Characters</span>
                  <strong>{result.analysis.metrics.charCount}</strong>
                </li>
                <li>
                  <span>Sentiment</span>
                  <strong>{result.analysis.metrics.sentimentScore}</strong>
                </li>
                <li>
                  <span>Readability</span>
                  <strong>{result.analysis.metrics.readabilityScore}</strong>
                </li>
              </ul>

              {result.analysis.metrics.hashtags.length > 0 && (
                <div className="tags">
                  <p>Hashtags</p>
                  <div>
                    {result.analysis.metrics.hashtags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.analysis.metrics.mentions.length > 0 && (
                <div className="tags">
                  <p>Mentions</p>
                  <div>
                    {result.analysis.metrics.mentions.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="panel suggestions-panel">
            <h2>Suggestions</h2>
            <ol>
              {result.analysis.suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}
    </div>
  );
}

export default App;

