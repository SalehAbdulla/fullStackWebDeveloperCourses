import React from "react";
import ReactDOM from "react-dom";


const Heading = ()=>{
  return (
    <h1>My Favourite Foods</h1>
  );
};

const App = () => {
  return (
    <div>
      <Heading/>
      <ul>
        <li>Bacon</li>
        <li>Jamon</li>
        <li>Noodles</li>
      </ul>
    </div>
  );
};



export default App