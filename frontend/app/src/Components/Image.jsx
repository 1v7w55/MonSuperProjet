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
    console.log(data)
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
              <ul className={styles.grid}>
                {data.map((aircraft, index) => (
                  <div key={index} className={styles.square}>
                    <li>
                      <p className={styles.class}>Class: {aircraft.class}</p>
                      <h2>Name: {aircraft.name}</h2> 
                      <h4>Confidence: {Math.round(aircraft.confidence * 100)}%</h4>
                    </li>
                  </div>
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