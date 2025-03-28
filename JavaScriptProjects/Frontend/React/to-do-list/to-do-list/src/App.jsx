import React from "react";
import { useState } from "react";
import ToDoList from "./components/ToDoItem";

function App() {

  const [addItem, setAddItem] = useState("");
  const [items, setItems] = useState(["Java", "JavaScript"]);

  function handleOnChange(event){
    setAddItem(event.target.value);
  }

  function handleOnClick(){
    setItems((prevValues) =>{
      return [... prevValues, addItem];
    })
    setAddItem("");
  }

  function deleteItem(id){
    setItems((prevValues) =>{
      return prevValues.filter((item, index)=>{
        return index !== id;
      })
    })
  }

  return (
    <div className="container">

      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div className="form">
        <input value={addItem} onChange={handleOnChange} placeholder="Enter value"/>
        <button onClick={handleOnClick} ><span>Add</span></button>
      </div>

      <div>
        <ul>
          {items.map((item, index) =>   <ToDoList key={index} id={index} item={item} onChecked={deleteItem}/>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
