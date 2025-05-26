import "./ComponentForUseEffect.css";
import { useState, useEffect } from "react";

export const ComponentForUseEffect = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("green");

  const addCount = () => {
    setCount((count) => count + 1);
  };

  const subtractCount = () => {
    setCount((count) => count - 1);
  };

  const changeColor = () => {
    setColor((color) => (color === "green" ? "red" : "green"));
  };

  // Do code in certain critria
  useEffect(() => {
    document.title = `Counter Site: ${count} ${color}`; // I mean thiss


    return () => {
        // Some Clean up code
    }

  }, [count, color]); // if this value changes for any reason, do this.

  console.log(`Counter Site: ${count} ${color}`);

  return (
    <div className="main-div">
      <p style={{color: color}} >Count: {count}</p>
      <div>
        <button onClick={addCount}>Add</button>
        <button onClick={subtractCount}>subtract</button>
        <button onClick={changeColor}>Change Color</button>
      </div>
    </div>
  );
};
