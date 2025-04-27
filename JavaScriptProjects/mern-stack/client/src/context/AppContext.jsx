import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initilisation of AppContext Object
export const AppContext = createContext();

// AppContext provider, this will return <AppContext.Provider> tag

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserOpen, setShowUserOpen] = useState(false);

  const value = {navigate, user, setUser, isSeller, setIsSeller, showUserOpen, setShowUserOpen};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
