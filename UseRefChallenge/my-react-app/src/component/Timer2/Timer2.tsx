import { useState, useRef, useEffect } from "react";

const Timer2 = () => {
  const [timer, setTimer] = useState(0);
  const intervalId = useRef(0);
  const [isPause, setIdPause] = useState(false);

  useEffect(() => {
    if (!isPause) {
      if (intervalId.current) {
        intervalId.current = setInterval(() => {
          setTimer((preValue) => preValue + 1);
        }, 1000);
      }
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isPause]);

  return (
    <div>
      <h1>Timer: {timer} Seconds</h1>
      <button onClick={() => clearInterval(intervalId.current)}>Stop</button>
      <button onClick={() => setIdPause(true)}>Pause</button>
      <button onClick={() => setIdPause(false)}>Resume</button>
      <button onClick={() => setTimer(0)}>Clear</button>
    </div>
  );
};

export default Timer2;
