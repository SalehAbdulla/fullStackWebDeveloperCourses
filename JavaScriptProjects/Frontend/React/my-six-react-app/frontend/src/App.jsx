import React from "react";
import ReactDOM from "react-dom";
import "./App.css"
import Heading from "./components/Heading"
import FoodList from "./components/FoodList";
import valueOne from "./ImportAndExport";
import { valueTwo, valueThree } from "./ImportAndExport";
import * as calc from "./components/calculator";

let greeting;


function changeColorOfTheDay() {
  const time = new Date();
  const currentHour = time.getHours();
  if (currentHour < 12) {
    greeting = "Good morning";
    return "red";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
    return "blue";
  } else {
    greeting = "Good evening";
    return "green";
  }
}


const customStyle = {
  color: changeColorOfTheDay(),
  fontSize: "50px",
  border: "1px solid white",

}


const App = () => {
  return (
    <div>
      <Heading />
      <div>
        <ul>
          <li>{valueOne}</li>
          <li>{valueTwo}</li>
          <li>{valueThree}</li>
        </ul>
      </div>
      <h2 style={customStyle}>{greeting}</h2>
      <FoodList />
    </div>
  );
}








export default App