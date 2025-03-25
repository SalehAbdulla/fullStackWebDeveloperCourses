import React from "react";
import { useState } from "react";



function App() {


  const [items, setItems] = useState(["Java", "JavaScript", "Python"]);
  const [addItem, setAddItem] = useState("");


  function handleOnChange(event){
    setAddItem(event.target.value);
  }

  function handleOnClick(){
      setItems((prevItems) =>
        [...prevItems, addItem]
      )
  }


  return (
    <div className="container">

      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div className="form">

        <input value={addItem} onChange={handleOnChange} type="text" placeholder="Add to-do list"/>
        <button onClick={handleOnClick}> <span>Add</span> </button>

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
