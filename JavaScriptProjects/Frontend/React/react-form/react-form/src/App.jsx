import { useState } from 'react'
import './App.css'
import React from 'react';


function App() {


  const [fName, setFName] = useState();
  const [lName, setLName] = useState();

  function handleFName(event){
    setFName(event.target.value);
  }

  function handleLName(event) {
    setLName(event.target.value);
  }

 
  return (
    <>

      <div className='container'>
        <form>
          <h1>Hello {fName} {lName}</h1>
          <input onChange={handleFName} type='text' name='fName' placeholder='First Name'/>
          <input onChange={handleLName} type='text' name='lName' placeholder='Last Name' />
          <button>Submit</button>
        </form>

      </div>

    </>
  )
}

export default App
