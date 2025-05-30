import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType } from "./AppContext";

type AppContextProviderType = {
  children: ReactNode;
};


export const AppContextProvider = ({ children }: AppContextProviderType) => {
  const [username, setUsername] = useState("Saleh");
  const [counter, setCounter] = useState(0);

  const values: AppContextType = { username, setUsername, counter, setCounter};

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
