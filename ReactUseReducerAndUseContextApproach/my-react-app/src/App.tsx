import { useReducer } from "react";
import { UseAppContext } from "./context/UseAppContext";

const initialState = { count: 0 };

type ReducerActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };
type ReducerStateType = { count: number };

const reducer = (state: ReducerStateType, action: ReducerActionType) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: (state.count = 0) };
    default:
      return state;
  }
};

const App = () => {
  const { username, setUsername } = UseAppContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1
        onClick={() =>
          username === "Saleh" ? setUsername("Abdulla") : setUsername("Saleh")
        }
      >
        {username}
      </h1>
      <h1>Counter = {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

export default App;
