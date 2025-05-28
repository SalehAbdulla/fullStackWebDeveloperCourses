import { Link } from "react-router-dom";

const Button = () => {
  const handleOnClick = () => {
    console.log(`OUCH!`);
    const getRandomNumber = Math.floor(Math.random() * 100);
    console.log(getRandomNumber);
  };

  return <button onClick={handleOnClick}>Click Me</button>;
};

const CatchCopy = () => {
  const handleOnCopy = () => {
    console.log("Catch you Baby, you copied me");
  };

  return (
    <p onCopy={handleOnCopy}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque autem iste
      quae omnis rem laborum qui excepturi modi eius at.
    </p>
  );
};

const Move = () => {
  const handleOnMouseMove = () => {
    console.log("Mouse Moved right here");
  };

  return (
    <p onMouseMove={handleOnMouseMove}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsum
      voluptates quos consequuntur, quidem et quis aliquam deserunt autem est?
    </p>
  );
};

const LessonSeven = () => {
  return (
    <div>
      <Button />
      <CatchCopy />
      <Move />

      <Link to={"/"}> Back To Home</Link>
    </div>
  );
};

export default LessonSeven;
