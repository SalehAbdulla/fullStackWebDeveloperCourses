import './App.css';
import React from 'react';
import { useState } from 'react';


function App() {

  const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  const [header, setHeader] = useState("Hello");

  function changeHeader(event){
    setHeader(event.target.value);
  }

  return (

    <div>
      <form className='container'>
        <h1>{header}</h1>

        <input type='text' placeholder='Enter Name' />

        <button onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}
          style={{ backgroundColor: isMouseOver ? "black" : "white" }}
          onClick={changeHeader}
        >Submit</button>

      </form>
    </div>

  );
}

export default App

