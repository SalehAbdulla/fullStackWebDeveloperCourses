import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType } from "./AppContext";
import {useState} from "react";

type AppContextProviderType = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
   
  const [username, setUsername] = useState("Saleh");

  const values: AppContextType = { username, setUsername };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
