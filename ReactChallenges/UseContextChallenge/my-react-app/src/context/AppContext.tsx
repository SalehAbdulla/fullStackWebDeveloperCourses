import { createContext } from "react";

export type AppContextType = {
  username: string;
  setUsername: (name: string) => void;
  counter: number;
  setCounter: (counter: number) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
