import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

const style = {
  color : "red",
  fontSize : "20px",
  border : "1px solid white"
}

// 24 Morning is from 00 to 12, afternoon from 12 till 6 and evening from 6 till 00

function whatTime(){
  const date = new Date();
  const hour = date.getHours();
  console.log(hour);
  return hour;
};

function dayState(){
  const now = whatTime();
  if (now >= 0 && now <= 12){
    style.color = "red";
    return "MORNING";
  } else if (now > 12 && now <= 18){
    style.color = "blue";
    return "AFTERNOON";
  } else {
    style.color = "green";
    return "EVENING";
  }
};

dayState();


const App = () => {
  return (
    <div>
      <h1 style={style}>Hello World!</h1>
    </div>
  );
};


export default App;