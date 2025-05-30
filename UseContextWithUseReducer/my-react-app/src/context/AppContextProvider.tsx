import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType, ActionType, StateType } from "./AppContext";
import { useReducer, useState } from "react";

type AppContextProviderType = {
  children: ReactNode;
};

const initialState = { count: 0 };



const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: (state.count = 0) };
    case "set":
      return { ...state, count: (state.count = action.payload) };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  const [username, setUsername] = useState("SALEH");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const values: AppContextType = { username, setUsername, state, dispatch, input, setInput};

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
