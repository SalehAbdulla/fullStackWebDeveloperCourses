import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ExampleThree = () => {
  const [name, setName] = useState(() => {
    const getSavedName = localStorage.getItem("name");
    return getSavedName ? JSON.parse(getSavedName) : "";
  });

  // localStorage.removeItem("name");

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  return (
    <div>
      <h1>My Name is: {name}</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.currentTarget.value)
        }
        value={name}
      />
      <button onClick={() => setName("")}>Clear</button>

      <Link to={"/"}>Back To Home</Link>
    </div>
  );
};

export default ExampleThree;
