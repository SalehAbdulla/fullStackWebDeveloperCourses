import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {

  const [headingText, setHeadingText] = useState("Hello");
  const [isMouseOver, setMouseOver] = useState(false);
  const [isMouseOut, setMouseOut] = useState(false);


  function changeHeading(){
    setHeadingText("Happy Day");
  }

  function mouseOver(){
    console.log("Hovered Over");
    setMouseOver(true);
  }

  function mouseOut(){
    console.log("Hovered Out");
    setMouseOver(false);
  }



  return (
    <>
      <div>
        <div className="container">
          <h1>{headingText}</h1>
          <input type="text" placeholder="What's your name?" />
          <button 
          style={{backgroundColor: isMouseOver ? "black" : "white"}}
          
          onClick={changeHeading}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          > Submit </button>
        </div>
      </div>
    </>
  )
}

export default App
