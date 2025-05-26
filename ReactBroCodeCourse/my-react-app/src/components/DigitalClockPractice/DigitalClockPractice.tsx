import "./DigitalClockPractice.css";
import { useState, useEffect } from "react";

export const DigitalClockPractice = () => {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTimeFormat = () => {
    let hour = clock.getHours();
    const minutes = clock.getMinutes();
    const seconds = clock.getSeconds();
    const amOrPm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${padClock(hour)}:${padClock(minutes)}:${padClock(
      seconds
    )} ${amOrPm}`;
  };

  const padClock = (number: number) => {
    return (number < 10 ? "0" : "") + number;
  };

  return (
    <div>
      <h1>{getTimeFormat()}</h1>
    </div>
  );
};
