import { useState } from 'react'
import './App.css'
import React from 'react';


function App() {


  const [fullName, setFullName] = useState({firstName: "", lastName: ""});

  function handleOneChange(event) {

    const {name, value} = event.target;

    setFullName(prevValue => {
      console.log(prevValue);

      if (name === "firstName") {
        return ({firstName: value, lastName: prevValue.lastName});
      } else if (name === "lastName") {
        return ({firstName: prevValue.firstName, lastName: value});
      }

    })

  }


  return (
    <>
      <div className='container'>

        <form>
          <h1>Hello {fullName.firstName} {fullName.lastName}</h1>
          <input onChange={handleOneChange} name='firstName' value={fullName.firstName} placeholder='First Name'/>
          <input onChange={handleOneChange} name='lastName' value={fullName.lastName} placeholder='Last Name' />
          <button>Submit</button>
        </form>
      
      </div>
    </>
  )
}

export default App
