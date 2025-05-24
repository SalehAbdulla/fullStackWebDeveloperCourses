import "./ColorPicker.css";
import { useState } from "react";

export const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");
  const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.currentTarget.value);
  };

  return (
    <div className="main-display">
      <h1>Color Picker</h1>
      <div
        className="secondary-color-picker"
        style={{ backgroundColor: color }}
      >
        <p>Color Picked: {color} </p>
      </div>
      <label>Pick a color:</label>
      <input type="color" onChange={handleColor}></input>
    </div>
  );
};
