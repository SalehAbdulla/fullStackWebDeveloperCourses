import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";

type useContextProviderType = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: useContextProviderType) => {
  const [username, setUsername] = useState("SALEH");
  const values = { username, setUsername };

  return (<AppContext.Provider value={values}>
   {children}
  </AppContext.Provider>);
};
