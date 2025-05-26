import { useContext } from "react";
import { UserContext } from "../ComponentA/ComponentA";
import "../index.css";


export const ComponentD = () => {

    const user = String(useContext(UserContext));


    return ( 
        <div className="box">
            <h1>ComponentD</h1>
            <h2>{user}</h2>
        </div>
    );
}