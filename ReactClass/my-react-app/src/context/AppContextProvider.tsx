// Hook it

import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { AppContextType } from "./AppContext";
import { useState } from "react";

type useAppContextType = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: useAppContextType) => {
  const [username, setUsername] = useState("SALEH");

  const values: AppContextType = { username, setUsername };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
