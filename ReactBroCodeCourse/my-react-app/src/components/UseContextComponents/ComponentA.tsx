import "./index.css";
import {useState, createContext} from 'react';
import "./ComponentB";
import { ComponentB } from "./ComponentB";

export const UserContext = createContext<string>("");

export const ComponentA = () => {

    const [user, setUser] = useState("Saleh");

    return ( 
        <div>
            <UserContext.Provider value={user}>
                <h1>ComponentA</h1>
                <ComponentB />
            </UserContext.Provider>
        </div>
    );
}
