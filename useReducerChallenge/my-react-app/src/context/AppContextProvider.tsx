import { useReducer, useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType, StateType, ActionType } from "./AppContext";

type AppContextProviderType = {
  children: ReactNode;
};

const initialState = { counter: 0 };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    case "reset":
      return { ...state, counter: (state.counter = 0) };
   case "set":
      return {...state, counter: action.payload}
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {

  const [username, setUsername] = useState("SALEH");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const values: AppContextType = { username, setUsername, state, dispatch, input,  setInput};

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
  
};
