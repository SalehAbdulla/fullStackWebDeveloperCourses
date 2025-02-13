import React from "react";
import ReactDom from "react-dom";
import './App.css'

const fName = "Saleh";
const lName = "Abdulla";
const date = new Date().getFullYear();


const App = ()=> {
  return (
    <div>
      <h1>Created by {fName + " " + lName}</h1>
      <p>Copyright {date}</p>
    </div>
  )
}

export default App;