import React, { useState } from "react";

export const App = () => {
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
    <div>
      Select an image file: <br />
      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview upload" />}
      <button onClick={handleClick}>Upload</button>
      {apiMessage !== "" && (
        <div>
          <p>API said: {apiMessage}</p>
          <img src={`/api/image/${apiMessage}`} alt="Return" />
        </div>
      )}
    </div>
  );
};

export default App;
