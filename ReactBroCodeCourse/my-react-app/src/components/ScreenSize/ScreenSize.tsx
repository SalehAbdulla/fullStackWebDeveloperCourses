import "./ScreenSize.css";
import { useState, useEffect } from "react";

export const ScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log("EVENT LISTENER ADDED");

    // Good Practice to clean our code
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("EVENT LISTENER Removed");
    };
  }, []);

  useEffect(() => {
    document.title = `size: ${width} x ${height}`;
  }, [width, height]);

  return (
    <div>
      <p onChange={handleResize}>Window Width: {width}px</p>
      <p onChange={handleResize}>Window Height: {height}px</p>
    </div>
  );
};
