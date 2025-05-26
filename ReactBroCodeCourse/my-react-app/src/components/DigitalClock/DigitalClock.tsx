import "./DigitalClock.css";
import {useState, useEffect} from "react";


export const DigitalClock = () => {


    const [time, setTime] = useState<number>(new Date().getTime());

    useEffect(()=> {
        const intervalId = setInterval(()=> setTime(new Date().getTime()), 1000);

        return () => {
            clearInterval(intervalId);
        }
    },[])

    const formatTime = () => {

        const date = new Date(time);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM"
        
        hours = hours % 12 || 12;

        const pad = (n:number) => n.toString().padStart(2, "0")

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${meridiem}`;

    }

    return ( 
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    );
}