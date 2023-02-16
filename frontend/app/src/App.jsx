import React, { useState } from "react";
import ImageUpload from "./Components/Image";

export const App = () => {
  const [name, setName] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const handleClick = async () => {
    if (name === "") return;

    const response = await fetch(`/api/hello?name=${name}`, { method: "GET" });
    const message = await response.json();
    setApiMessage(message);
  };

  return (
    <div>
      <ImageUpload />
      {/* Enter your name: <br />
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <button onClick={handleClick}>Submit</button>
      <p>API said: {apiMessage}</p> */}
    </div>
  );
};

export default App;
