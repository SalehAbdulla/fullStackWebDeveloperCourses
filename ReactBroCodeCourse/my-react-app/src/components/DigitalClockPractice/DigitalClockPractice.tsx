import "./DigitalClockPractice.css";
import { useState, useEffect } from "react";

export const DigitalClockPractice = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTime = () => {
    let hour = time.getHours();
    const minute = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hour > 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${padZero(hour)}:${padZero(minute)}:${padZero(seconds)} ${meridiem}`;
  };

  const padZero = (number: number) => {
    return (number < 10 ? "0" : "") + number;
  };

  return (
    <div>
      <h1>{getTime()}</h1>
    </div>
  );
};
