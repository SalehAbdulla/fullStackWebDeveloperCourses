import { UseAppContext } from "../../context/UseAppContext"

const Counter = () => {

   const {state, dispatch, input, setInput} = UseAppContext();

  return (
    <div>
      <h1>Counter Application</h1>
      <h1>{state.count}</h1>
      <button onClick={()=> dispatch({type: "increment"})}>Increment</button>
      <button onClick={()=> dispatch({type: "decrement"})}>decrement</button>
      <button onClick={()=> dispatch({type: "reset"})}>Reset</button>
      <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.currentTarget.value)} value={input} type="number" placeholder="Enter Number" />
      <button onClick={()=> dispatch({type: "set", payload: Number(input)})}> Change Value by Input</button>
    </div>
  )
}

export default Counter
