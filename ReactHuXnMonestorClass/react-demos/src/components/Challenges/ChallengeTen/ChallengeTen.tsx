import React, { useState } from "react";
import {Link} from "react-router-dom";

type toDoListType = {
  id: number;
  title: string;
};

const ChallengeTen = () => {
  const [toDoList, setToDoList] = useState<toDoListType[]>([
    {
      id: 1,
      title: "WORK",
    },
  ]);

//   let id = toDoList.length + 1;  Logic Error

//   useEffect(() => {
//     id++;
//   }, [id]);

  const [inputValue, setInputValue] = useState("");

  const handleAddToDoList = () => {
    setToDoList((toDoList) => [...toDoList, { id: Date.now(), title: inputValue }]);
    setInputValue("");
  };

  const handleDeleteToDoList = (index: number) => {
    setToDoList((toDoList) => toDoList.filter((_, i) => i !== index));
  };

  const handleUpdateToDoList = (index: number) => {
    if (inputValue.trim() === "") {
        alert("Please Add value");
        return;
    }

    setToDoList(toDoList.map((element, i) => i === index ? {...element, title: inputValue} : element));
    setInputValue("");
    
  }

  return (
    <div>
      {toDoList.map((element, index) => (
        <>
          <li key={index}>
            {element.title}{" "}
            <span>
              <button onClick={() => handleUpdateToDoList(index)}>update</button>{" "}
              <button onClick={() => handleDeleteToDoList(index)}>Delete</button>
            </span>
          </li>
        </>
      ))}

      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(event.currentTarget.value)
        }
        value={inputValue}
        placeholder="Add To Do List"
      />
      <button onClick={handleAddToDoList}>ADD</button>

      <Link to={"/"}>Back To Home</Link>
    </div>
  );
};

export default ChallengeTen;
