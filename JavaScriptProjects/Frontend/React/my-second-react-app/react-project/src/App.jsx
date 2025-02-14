import React from "react";
import ReactDom from "react-dom";
import './App.css'

const fName = "Saleh";
const lName = "Abdulla";
const date = new Date().getFullYear();

const imgOne = "https://picsum.photos/200/";

const App = ()=> {
  return (
    <div>
      <div className="heading" spellCheck="true">
        <h1>React heading</h1>

        <div className="food-images">
          <img alt="randomimage" className="photos" src={imgOne}></img>
          <img alt="randomimage" className="photos" src={imgOne}></img>  
          <img alt="randomimage" className="photos" src={imgOne}></img>
        </div>

      </div>
      <h1 id="name">Created by {fName + " " + lName}</h1>
      <p>Copyright {date}</p>
    </div>
  )
};

export default App;
