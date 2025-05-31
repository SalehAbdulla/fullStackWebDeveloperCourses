import "./Counter.module..css";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };
  
  const handleDecrement = () => {
    setCount((count) => count - 1);
  };

  return (
    <div className="style.container">
      <div>
        <h1 className="style.number">Counter = {count}</h1>
      </div>

      <div className="style.btns-container"></div>
      <button onClick={handleIncrement} className="increment">
        +
      </button>
      <button onClick={handleDecrement} className="increment">
        -
      </button>
    </div>
  );
};

export default Counter;
