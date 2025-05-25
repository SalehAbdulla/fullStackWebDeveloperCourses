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

  const handleAddTask = (newTask: string) => {
    setTasks((tasks) => [...tasks, newTask]);
    setNewTask("");
  };
  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => index != i));
  };

  const moveTaskUp = (index: number) => {
    if (index > 0) {
      const updatedArray = [...tasks];
      [updatedArray[index], updatedArray[index - 1]] = [
        updatedArray[index - 1],
        updatedArray[index],
      ];
      setTasks(updatedArray);
    }
  };

  const moveTaskDown = (index: number) => {
    if (index < tasks.length - 1) {
      const updatedArray = [...tasks];
      [updatedArray[index], updatedArray[index + 1]] = [
        updatedArray[index + 1],
        updatedArray[index],
      ];
      setTasks(updatedArray);
    }
  };

  const handleKeyDown = <T extends HTMLElement>(event: React.KeyboardEvent<T>) => {
    if (event.key === "Enter") {
      handleAddTask(newTask);
    }
  };

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleAddTask(newTask)} className="add-button">
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <div className="all-btn">
              <button
                onClick={() => handleRemoveTask(index)}
                className="delete-button"
              >
                Delete
              </button>
              <button onClick={() => moveTaskUp(index)} className="move-button">
                ☝️
              </button>
              <button
                onClick={() => moveTaskDown(index)}
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
