import React, { useState } from "react";
import "../main.css"

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test: submitting");
  };

  return (
    <form>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="uploaded" id="current_plane" />}
      <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
  );
}

export default ImageUpload;