import React from "react";
import add from "./components/calculator";
import {multiply, divide, subtract} from "./components/calculator";

const CalcApp = ()=>{
    return(
    <div>
        <ul>
            <li>{add(5,2)}</li>
            <li>{multiply(5,2)}</li>
            <li>{divide(5,2)}</li>
            <li>{subtract(5,2)}</li>
        </ul>
    </div>
    )
}


export default CalcApp