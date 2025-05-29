import { useState } from "react";

const ExampleTwo = () => {
  const [randomNumber, setRandomNumber] = useState(() =>
    Math.floor(Math.random() * 101)
  );

  return <section>
    <h1>{randomNumber}</h1>
    <button onClick={()=> setRandomNumber(Math.floor(Math.random() * 101))}>Get Another Random Number</button>
  </section>
};

export default ExampleTwo;
