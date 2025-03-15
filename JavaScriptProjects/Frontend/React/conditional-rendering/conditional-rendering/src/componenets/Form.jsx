import React, {useState} from "react";
import "./form.css";

const Form = ()=>{

    var [time, setTime] = useState("Time");

    function replaceToTime(){
        time = setTime(new Date().toLocaleTimeString());
    }

    // setInterval(replaceToTime, 1000);

    return (
        <div>
            <h1>{time}</h1>

            <div>
                <button onClick={replaceToTime} id="time">GET TIME</button>
            </div>
        </div>
    );
}


export default Form;
