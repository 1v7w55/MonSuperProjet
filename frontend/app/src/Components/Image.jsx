import React, { useState } from 'react';
import styles from './styles/ImageUpload.module.css';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [apiMessage, setApiMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

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

    setApiMessage(data.filename);
  };

  return (
    <>
    <div className={styles.container}>
      <h2>Image Upload</h2>
      <div className={styles.formContainer}>
        <label htmlFor="fileInput">Select an image file:</label>
        <input type="file" id="fileInput" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview upload" className={styles.previewImg} />}
        <button onClick={handleClick} className={styles.uploadBtn}>See edges</button>
      </div>
      {apiMessage !== "" && (
        <div className={styles.resultContainer}>
          <h3>API said:</h3>
          <p>{apiMessage}</p>
          <img src={`/api/image/${apiMessage}`} alt="Return" className={styles.resultImg} />
        </div>
      )}
    </div>
    </>
  );
}

export default ImageUpload;