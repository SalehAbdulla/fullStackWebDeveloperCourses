import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// We setup useEffect hook to run some code When
// component renders for the (first time)
// WHENEVER it re-renders
// some data in our component changed.

const LessonSeventeen = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    document.title = `Increment ${value}`;
  }, [value]);

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={()=> setValue(value => value + 1)}>Increment</button>
      <Link to={"/"}>Back To Home</Link>
    </div>
  );
};

export default LessonSeventeen;
