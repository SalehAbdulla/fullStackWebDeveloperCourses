import "./ToDoList.css";
import React, { useState } from "react";

type ToDoList = {
  task: string;
};

export const ToDoList = () => {
  const [tasks, setTasks] = useState([
    "Meditation",
    "Workout",
    "Zeyarat Aashoraa",
  ]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
  };

  const handleAddTask = (newTask:string) => {
    setTasks(tasks => [...tasks, newTask]);
    setNewTask("");
  };
  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_,i) => index != i));
  };
  const moveTaskUp = (index: number) => {};

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={()=> handleAddTask(newTask)} className="add-button">
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li>
            <span className="text">{task}</span>
            <div className="all-btn">
              <button
                onClick={() => handleRemoveTask(index)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                className="move-button"
              >
                ☝️
              </button>
              <button
                className="move-button"
              >
                👇
              </button>
            </div>
          </li>
        ))}
      </ol>

    </div>
  );
};
