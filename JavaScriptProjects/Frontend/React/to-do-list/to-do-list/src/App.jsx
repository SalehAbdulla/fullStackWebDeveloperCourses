import React from "react";
import { useState } from "react";
import ToDoItem from "./components/ToDoItem";


function App() {

  const [items, setItems] = useState(["Java", "Javascript", "Python"]);
  const [addItem, setAddItem] = useState();

  function handleOnChange(event) {
    setAddItem(event.target.value);
  }

  function handleOnClick() {
    if (addItem.trim() != "") {
      setItems((prevValues) => {
        return [...prevValues, addItem];
      })

      setAddItem("");

    }
  }

  return (
    <div className="container">

      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div className="form">

        <input onChange={handleOnChange} value={addItem} type="text" placeholder="Add to-do list" />
        <button onClick={handleOnClick} > <span>Add</span> </button>

      </div>

      <div>
        <ToDoItem value={items}/>
      </div>

    </div>
  );
}

export default App;
