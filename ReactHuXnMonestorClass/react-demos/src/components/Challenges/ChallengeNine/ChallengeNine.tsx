import { useEffect, useState } from "react";

const ChallengeNine = () => {
  const [counter, setCounter] = useState(() => {
    const getCounterFromUserStorage = localStorage.getItem("counter");
    return getCounterFromUserStorage
      ? JSON.parse(getCounterFromUserStorage)
      : 0;
  });

  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  return <div>
    <h1>Counter = {counter}</h1>
    <input type="number" value={counter} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setCounter(Number(e.currentTarget.value))}/>
    <button onClick={()=> setCounter(0)}>Clear</button>
  </div>;
};

export default ChallengeNine;
