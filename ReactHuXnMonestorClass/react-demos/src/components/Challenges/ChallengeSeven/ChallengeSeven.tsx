import { Link } from "react-router-dom";

type TempProp = {
  temp: number;
};

const ChallengeSeven = ({ temp }: TempProp) => {
  if (temp < 15) {
    return;
    <>
      <h1>It's Cold outside</h1>
      <Link to={"/UserStatus"}>UserState - part 2 of the challenge</Link>
      <br />
      <Link to={"/challengeSevenGreeting"}>
        Greeting - Part 3 of the challenge
      </Link>
    </>;
  } else if (temp >= 15 && temp <= 25) {
    return;
    <>
      <h1>It's Cold outside</h1>
      <Link to={"/UserStatus"}>UserState - part 2 of the challenge</Link>
      <br />
      <Link to={"/challengeSevenGreeting"}>
        Greeting - Part 3 of the challenge
      </Link>
    </>;
  } else {
    return (
      <>
        <h1>It's hot outside</h1>
        <Link to={"/UserStatus"}>UserState - part 2 of the challenge</Link>
        <br />
        <Link to={"/challengeSevenGreeting"}>
          Greeting - Part 3 of the challenge
        </Link>
      </>
    );
  }
};

export default ChallengeSeven;
