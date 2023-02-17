import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch('/api/modify/', {
      method: 'POST',
      body: formData
    });

    const blob = await response.blob();
    setPreview(URL.createObjectURL(blob));
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>
      {preview && <img src={preview}/>}
    </div>
  );
}

export default ImageUpload;