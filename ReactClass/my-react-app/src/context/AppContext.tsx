// Create it 

import { createContext } from "react";

export type AppContextType = {
   // initial Type 
   username: string;
   setUsername: (username:string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
