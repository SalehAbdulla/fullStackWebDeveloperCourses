import { useState } from 'react'
import './App.css'
import React from 'react';


function App() {

  const [header, setHeader] = useState("");
  const [headerTwo, setHeaderTwo] = useState("");


  function handleChange(event) {
    setHeader(event.target.value);
  }

  function handleClick(){
    setHeaderTwo(header);
  }
 
  return (
    <>

      <div className='container'>

        <form>
          <h1> {headerTwo} </h1>
          <input onChange={handleChange} name='username' placeholder='Enter Your Name' />
          <button onClick={handleClick}> Submit </button>
        </form>

      </div>

    </>
  )
}

export default App
