import { createContext, useContext } from "react";
import {useNavigate} from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const value = {};
    
    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>
};

export const useAppContext = () => {
  useContext(AppContext);
};
