import React, { useState } from 'react';
import '../main.css';
function Image() {
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    setFileData(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', fileData);

    fetch('http://0.0.0.0:8000/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

    setFileData(null);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Send</button>
    </form>
    {fileData && <img src={URL.createObjectURL(fileData)} alt="preview" id="current_plane" />}
    </>
  );
}

export default Image;


