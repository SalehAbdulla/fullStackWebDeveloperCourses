import "./Counter.css";
import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  function increase() {
    setCounter(counter + 1);
  }

  function reset() {
    setCounter(0);
  }

  function decrease() {
    setCounter(counter - 1);
  }

  return (
    <div>
      <div className="counter-box">
        <p className="counter">{counter}</p>
      </div>

      <div className="counter-button-box">
        <button onClick={increase} className="counter-button">Increase</button>
        <button onClick={reset} className="counter-button">Reset</button>
        <button onClick={decrease} className="counter-button">Decrease</button>
      </div>
    </div>
  );
};
