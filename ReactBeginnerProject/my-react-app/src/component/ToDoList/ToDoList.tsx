import styles from "./ToDoList.module.css";
import { useState } from "react";

type ToDosType = {
  title: string;
  id: string;
};

const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDosType[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") {
      alert("Input must have a value");
      return;
    }
    setToDos((prev) => [...prev, { title: input, id: Date.now().toString() }]);
    setInput("");
  };

  const handleDelete = (index: string) => {
    setToDos((toDos) => toDos.filter((element) => element.id !== index));
  };

  const handleKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleUpdate = (index: string) => {
    if (input.trim() == "") {
      alert("Input must have a value");
      return;
    }
    setToDos((toDos) =>
      toDos.map((element) =>
        element.id === index ? { title: input, id: element.id } : element
      )
    );
    setInput("");
  };

  return (
    <div className={styles.container}>
      {toDos.map((element) => (
        <section key={element.id}>
          <li>{element.title}</li>
          <button onClick={() => handleDelete(element.id)}>Delete</button>
          <button onClick={() => handleUpdate(element.id)}>Update</button>
        </section>
      ))}

      <input
        onKeyDown={handleKeyDown}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.currentTarget.value)
        }
        value={input}
        placeholder="Please Enter To Do"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ToDoList;
