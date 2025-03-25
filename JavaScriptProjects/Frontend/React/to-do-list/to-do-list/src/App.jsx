import React from "react";
import { useState } from "react";


function App() {

  const [items, setItems] = useState(["Java", "Java Script", "Python"]);
  const [newItem, setNewItem] = useState(""); 

  function handleOnChange(event) {
    setNewItem(event.target.value);
  }

  function handleOnClick(){
    
    setItems(prevValues =>
      [...prevValues, newItem]
    )

  }


  return (
    <div className="container">

      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div className="form">

        <input onChange={handleOnChange} type="text" placeholder="Add to-do list"/>
        <button onClick={handleOnClick} > <span>Add</span> </button>

      </div>

      <div>
        <ul>
          {items.map(item => <li>{item}</li>)}
        </ul>
      </div>

    </div>
  );
}

export default App;
