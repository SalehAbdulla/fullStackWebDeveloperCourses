import { createContext } from "react";

export type AppContextType = {
  username: string;
  setUsername: (username: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
