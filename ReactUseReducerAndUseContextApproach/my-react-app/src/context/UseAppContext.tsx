import { AppContext } from "./AppContext";
import { useContext } from "react";

export const UseAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("UseAppContext Must be used by AppContextProvider");
  }
  return context;
};
