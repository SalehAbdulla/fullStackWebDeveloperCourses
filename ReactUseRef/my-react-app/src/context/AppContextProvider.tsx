import { AppContext } from "./AppContext";
import type { ReactNode } from "react";
import { useState } from "react";
import type { AppContextType } from "./AppContext";
import {useRef} from "react";

type AppContextProviderType = { children: ReactNode };

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  const [username, setUsername] = useState("Saleh");
  const inputElement = useRef<HTMLInputElement | null>(null);


  const values:AppContextType = { username, setUsername, inputElement };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
