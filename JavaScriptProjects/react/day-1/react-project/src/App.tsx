import "./index.css";
import { useState } from "react";

type State = {
  count: number;
  firstName: string;
  lastName: string;
};

export const App = () => {
  
  // We constrctring the the useState here
  // const [count, setCount] = useState<number>(0);
  // const [firstName, setFirstName] = useState<string>("Saleh");
  // const [lastName, setLastName] = useState<string>("Abdulla");

  const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4, 5]);

  const someValue = () => {
    console.log("Big logic. Expensive Calculation");
    return 10;
  };

  const [state, setCount] = useState<State>(() => ({
    count: someValue(),
    firstName: "Saleh",
    lastName: "Abdulla",
  }));

  const increase = () => {
    setCount({ ...state, count: state.count + 1 });
    console.log(`Count:  ${state.count}`);
    console.log(`First Name: ${state.firstName}`);
  };

  const add = () => {
    console.log(numbers);
    setNumbers([...numbers, numbers[numbers.length - 1] + 1]);
  };

  return (
    <div className="center">
      <div>
        <h1>{state.count}</h1>
        <button onClick={increase}>Click</button>
        <button onClick={add}>Add New Number</button>
      </div>

      <div className="">
        {numbers.map((number, i) => (
          <span className="center-span" key={i}>
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
