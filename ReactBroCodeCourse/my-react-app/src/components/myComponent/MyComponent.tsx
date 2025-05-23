import "./myComponent.css";
import { useState } from "react";

export const MyComponent = () => {
    
  const [name, setName] = useState("Saleh");
  const [count, setCount] = useState(0);
  const [isEmployed, setIsEmployed] = useState(false);

  function handleState() {
    setName((prevValue) => (prevValue === "Saleh" ? "Ahmed" : "Saleh"));
  }

  function handleCounter() {
    setCount((prevValue) => prevValue + 1);
  }

  function handleEmployement() {
    setIsEmployed(!isEmployed);
  }

  return (
    <div>
      <p>{name}</p>
      <p>{count}</p>
      <button className="button" onClick={handleState}>Click me to Change name</button>
      <button className="button" onClick={handleCounter}>Increase Counter</button>
      <br />
      <p>Is Employes: {isEmployed ? "true" : "false"}</p>
      <button className="button" onClick={handleEmployement}>Is Employed </button>
    </div>
  );
};
