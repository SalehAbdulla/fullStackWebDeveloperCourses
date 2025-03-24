import { useState } from 'react'
import './App.css'
import React from 'react';


function App() {

  const [contact, setContact] = useState({ fName: "", lName: "", email: "" });

  function handleOnChange(event) {
    
    const { name, value } = event.target;

    setContact((previousValue) => { 
      return ({
        ... previousValue,
        [name] : value,
      })
    });

  }

  return (
    <>
      <div className='container'>

        <form>

          <h1> Hello {contact.fName} {contact.lName}</h1>
          <p>{contact.email}</p>

          <input onChange={handleOnChange} name='fName' value={contact.fName} placeholder='First Name' />
          <input onChange={handleOnChange} name='lName' value={contact.lName} placeholder='Last Name' />
          <input onChange={handleOnChange} name='email' value={contact.email} placeholder='Email' />

          <button>Submit</button>

        </form>

      </div>
    </>
  )
}

export default App
