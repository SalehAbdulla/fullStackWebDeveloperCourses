import "./index.css";
import { useContext } from "react";
import {UserContext} from './ComponentA';

export const ComponentB = () => {

    const user = useContext(UserContext);

    return ( 
        <div>
            <h2>{user}</h2>
        </div>
    );
}