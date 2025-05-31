import { UseAppContext } from "../../context/UseAppContext"
import { useState } from "react";

const Counter = () => {


  const {state, dispatch} = UseAppContext();
  const [input, setInput] = useState(0);

  return (
    <div>
      <h1>Counter: {state.count}</h1>
      <button onClick={()=> dispatch({type: "increment"})}>ADD</button>
      <button onClick={() => dispatch({type: "decrement"})}>Subtract</button>
      <button onClick={()=> dispatch({type: "reset"})}>Rest</button>
      <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(Number(e.currentTarget.value))} value={input} />
      <button onClick={()=> dispatch({type: "set", payload: input})}>Jump</button>
    </div>
  )
}

export default Counter;
