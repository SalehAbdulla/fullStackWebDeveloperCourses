import { Link } from "react-router-dom";

type Prop = {
  timeOfDay: string;
};

const ChallengeSevenGreeting = ({timeOfDay}: Prop) => {
  const greeting = () => {
    if (timeOfDay.toLowerCase() === "morning".toLowerCase()) {
      return (
        <>
          <h1>Happy Morning</h1>
          <Link to={"/"}>Back to Home</Link>
        </>
      );
    } else if (timeOfDay.toLowerCase() === "aftenoon".toLowerCase()) {
      return (
        <>
          <h1>Happy afternoon</h1>
          <Link to={"/"}>Back to Home</Link>
        </>
      );
    } else if (timeOfDay.toLowerCase() === "Evening".toLowerCase()) {
      return (
        <>
          <h1>Happy Evening</h1>
          <Link to={"/"}>Back to Home</Link>
        </>
      );
    } else {
      return <h1>Invalid time of Day</h1>;
      <Link to={"/"}>Back to Home</Link>;
    }
  };

  return (
    <div>
      <h1>{greeting()}</h1>
    </div>
  );
};

export default ChallengeSevenGreeting;
