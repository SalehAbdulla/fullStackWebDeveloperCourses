import "./ToDoListPractice.css";
import { useState } from "react";

export const ToDoListPractice = () => {
  const [tasks, setAllTasks] = useState([
    "Meditation",
    "WorkOut",
    "ZayratAashoraa",
  ]);

  const [taskInput, setTaskInput] = useState("");

  const handleTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.currentTarget.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setAllTasks((tasks) => [...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const handleRemoveTask = (index: number) => {
    setAllTasks((tasks) => tasks.filter((_, i) => index !== i));
  };

  const handleUpButton = (index: number) => {
    if (index > 0) {
      const array = [...tasks];
      [array[index], array[index - 1]] = [array[index - 1], array[index]];
      setAllTasks(array);
    }
  };

  const handleDownButton = (index: number) => {
    if (index < tasks.length - 1) {
      const array = [...tasks];
      [array[index], array[index + 1]] = [array[index + 1], array[index]];
      setAllTasks(array);
    }
  };

  return (
    <div>
      <div className="title-div">
        <h2>To-Do-List</h2>
        <input value={taskInput} onChange={handleTaskInput} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="to-do-list">
        <ol>
          {tasks.map((element, index) => (
            <li className="li" key={index}>
              <span>{element}</span>{" "}
              <button onClick={() => handleRemoveTask(index)}>Delete</button>
              <button onClick={() => handleUpButton(index)}>Up</button>
              <button onClick={() => handleDownButton(index)}>Down</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
