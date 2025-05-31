import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import { useReducer, useState } from "react";
import type { AppContextType } from "./AppContext";
import type { StateType, ActionType } from "./AppContext";

export type AppContextProviderType = {
  children: ReactNode;
};

const initialState = { count: 0 };

const reducer = (state: StateType, action: ActionType) => {
  switch(action.type) {
    case "increment":
      return {...state, count: state.count + 1};
    case "decrement":
      return {...state, count: state.count - 1};
    case "reset":
      return {...state, count: state.count = 0};
    case "set":
      return {...state, count: state.count = action.payload};
  }
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  const [username, setUsername] = useState("Saleh");

  const [state, dispatch] = useReducer(reducer, initialState);

  const values: AppContextType = { username, setUsername, state, dispatch };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
