import { createContext } from "react";

export type AppContextType = {
  username: string;
  setUsername: (username: string) => void;

  state: StateType;
  dispatch: React.Dispatch<ActionType>;

  input: string;
  setInput: (input: string) => void;

};

export type ActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };

export type StateType = { count: number };

export const AppContext = createContext<AppContextType | undefined>(undefined);
