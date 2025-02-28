import { useState } from 'react'
import './App.css'

function App() {


  // This is called declarative programming
  const isDone = false;
  const doneLineStylingDeclaratively = { textDecoration : "line-through" };

  // This is called imperative programming
  function imperativeStrike(){
    document.getElementById("milk").style.textDecoration = "line-through";
  }

  function impretiveUnstrike(){
    document.getElementById("milk").style.textDecoration = null;
  }
  
  return (
    <>
      <div>
        <h1 style={(isDone) ? doneLineStylingDeclaratively : null}> Something </h1>
        <p id='milk' >buy milk</p>
        <button onClick={imperativeStrike}>Strike</button>
        <button onClick={impretiveUnstrike}>Unstrike</button>
      </div>
    </>
  )
}

export default App
