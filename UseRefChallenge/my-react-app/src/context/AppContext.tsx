import { createContext } from "react";

export type AppContextType = {
   username: string;
   setUsername: (username: string) => void;
   currentInput: React.RefObject<HTMLInputElement | null>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
