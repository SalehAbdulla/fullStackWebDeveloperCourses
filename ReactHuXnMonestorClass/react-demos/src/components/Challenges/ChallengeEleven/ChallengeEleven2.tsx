import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ChallengeEleven2 = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = `Counter page | counter = ${counter}`;
  }, [counter]);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        Increment
      </button>
      <Link to={"/challengeEleven3"}>Part three of the challenge</Link>

    </div>
  );
};

export default ChallengeEleven2;
