import './App.css';
import { useState } from 'react';



function App() {


  let initialColor = {backgroundColor: "white"};

  const [color, setColour] = useState(initialColor);

  function setColourBlack(){
    const newColor = {backgroundColor: "black"}
    setColour(newColor);
  }

  function setColourWhite(){
    const newColor = {backgroundColor: "white"}
    setColour(newColor);
  }


  return (
    <>
      <div>

        <form>
          <input type="text" placeholder="What's your name?" />
          <button onMouseOver={setColourBlack} onMouseOut={setColourWhite} style={color}>Submit</button>
        </form>

      </div>
    </>
  )
}

export default App

