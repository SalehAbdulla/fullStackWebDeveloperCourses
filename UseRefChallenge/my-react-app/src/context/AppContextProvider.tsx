import { useRef, useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType } from "./AppContext";

type AppContextProvider = { children: ReactNode };

export const AppContextProvider = ({ children }: AppContextProvider) => {

  const [username, setUsername] = useState("Saleh");
  const currentInput = useRef<HTMLInputElement | null>(null);
  const values: AppContextType = { username, setUsername, currentInput };


  return (<AppContext.Provider value={values}>
      {children}
   </AppContext.Provider>);
};
