import { useContext } from "react"
import { AppContext } from "./AppContext"

export const UseAppContext = ()=>{
   const context = useContext(AppContext);
   if (!context) {
      throw new Error("UserAppContext must be used by AppContextProvider-- Make sure to wrap up the Application")
   }
   return context;
}
