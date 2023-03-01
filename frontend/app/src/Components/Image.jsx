import React, { useState } from 'react';
import styles from './styles/ImageUpload.module.css';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [possibleAircraft, setPossibleAircraft] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleClick = async () => {
    if (file === null) return;

    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await response.json();
    setData(data);
    setPossibleAircraft(data.length);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Image Upload</h2>
        <div className={styles.formContainer}>
          <label htmlFor="fileInput" className={styles.label}>Select an image file:</label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
          {previewUrl && <img src={previewUrl} alt="Preview upload" className={styles.previewImg} />}
          <button onClick={handleClick} className={styles.uploadBtn}>Find this aircraft</button>
          {possibleAircraft > 0 ? (
            <div>
              <p className={styles.info}>Found {possibleAircraft}:</p>
              <ul>
                {data.map((aircraft, index) => (
                  <li key={index}>
                    Name: {aircraft.name}, Confidence: {Math.round(aircraft.confidence * 100)}%
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className={styles.info}>No aircraft found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageUpload;