import "./ScreenSizePractice.css";
import { useState, useEffect } from "react";

export const ScreenSizePractice = () => {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleScreenChanges = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenChanges);
    document.title = `Screen Size ${height}px X ${width}px`
  }, [height, width]);

  
  return (
    <div>
      <h1>Screen Size</h1>
      <div className="screen-size">
        <p>Height: {height}px</p>
        <p>width: {width}px</p>
      </div>
    </div>
  );
};
