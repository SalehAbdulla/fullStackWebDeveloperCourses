import { useState } from 'react'
import './App.css'
import React from 'react';


function App() {


  const [contact, setContact] = useState({firstName : "", lastName: "", email: ""});

  function handleOneChange(event){

    setContact(prevValues => {

      const {name, value} = event.target;
      return ({...prevValues, [name] : value})

    })

  }

  return (
    <>
      <div className='container'>

        <form>

          <h1> Hello {contact.firstName} {contact.lastName}</h1>
          <p>{contact.email}</p>

          <input name='firstName' onChange={handleOneChange} placeholder='First Name' />
          <input name='lastName' onChange={handleOneChange} placeholder='Last Name' />
          <input name='email' onChange={handleOneChange} placeholder='Email' />
          <button>Submit</button>

        </form>

      </div>
    </>
  )
}

export default App
