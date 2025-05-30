import { useContext } from "react";
import { AppContext } from "./AppContext";

export const UseAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("UseAppContext must be used by AppContextProvider");
  }
  return context;
};
