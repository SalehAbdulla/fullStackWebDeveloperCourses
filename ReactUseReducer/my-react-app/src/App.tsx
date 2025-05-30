import { useReducer } from "react";
import { UseAppContext } from "./context/UseAppContext";

const initialState = { count: 0 };

type ActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

type StateType = {
  count: number;
};

const reducer = (state: StateType, action: ActionType): StateType => {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const {username, setUsername } = UseAppContext();

  return (
    <div>
      <h1>Counter = {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>

      <hr/>

      <h1 onClick={()=> username === "Saleh"? setUsername("Abdulla"): setUsername("Saleh")}>{username}</h1>

    </div>
  );
};

export default App;
