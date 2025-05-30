import { UseAppContext } from "../context/UseAppContext";

const Counter = () => {
  const { state, dispatch, input, setInput } = UseAppContext();

  return (
    <div>
      <h1>{state.counter}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      {"   "}
      <input
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInput(event.currentTarget.value)
        }
        value={input}
        placeholder="Change by specific value"
      />
      <button onClick={() => {
         dispatch({ type: "set", payload: Number(input) });
         setInput("");
      }}>
        Update Number
      </button>
    </div>
  );
};

export default Counter;
