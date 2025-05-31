import { useState } from "react";
import "./ToggleBackgroundColor.css";

const ToggleBackgroundColor = () => {

  const [backgroundColor, setBackgroundColor] = useState("white");
  const [textColor, setTextColor] = useState('#1b1b1b');
  const [buttonStyle, setButtonStyle] = useState("white");

  const handleClick = ()=> {
    setBackgroundColor(backgroundColor === 'white' ? '#1b1b1b' : 'white')
    setTextColor(textColor === "#1b1b1b" ? '#ffa31': "white");
    setButtonStyle(backgroundColor === 'white' ? '#1b1b1b': "white");
  }

  return (
    <div style={{backgroundColor, color: textColor}}>
      <h1>Welcome to A Real World</h1>
      <button onClick={handleClick} style={{backgroundColor: buttonStyle, color: textColor, border: `2px solid ${textColor}`}}>Change Dark Mode</button>
      {backgroundColor === '#1b1b1b' ? 'Black Theme' : 'White theme'}
    </div>
  )
}

export default ToggleBackgroundColor
