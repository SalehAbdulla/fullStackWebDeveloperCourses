import { useState } from "react";
import ComponentOne from "./ComponentOne";
import ComponentTwo from "./ComponentTwo";
import { Link } from "react-router-dom";

const LessonThirteen = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  return (
    <section>
      <ComponentOne count={count} onClickHandler={() => setCount(count + 1)} />
      <ComponentTwo
        count={count1}
        onClickHandler={() => setCount1(count1 + 1)}
      />
      <Link to={"/"}>Back To Home</Link>
    </section>
  );
};

export default LessonThirteen;
