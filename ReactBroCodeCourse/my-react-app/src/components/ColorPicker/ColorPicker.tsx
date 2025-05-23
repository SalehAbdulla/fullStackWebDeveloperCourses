import { useState } from "react";
import "./ColorPicker.css";

export const ColorPicker = () => {
  const [color, setColor] = useState("#FFFFFF");
  const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.currentTarget.value);
  };
  return (
    <div className="color-picker-container">
      <h1>Color Picker</h1>
      <div className="color-display" style={{ backgroundColor: color }}>
        <p>Select Color is = {color}</p>
      </div>
      <label>Select a Color</label>
      <input onChange={handleColor} value={color} type="color"></input>
    </div>
  );
};
