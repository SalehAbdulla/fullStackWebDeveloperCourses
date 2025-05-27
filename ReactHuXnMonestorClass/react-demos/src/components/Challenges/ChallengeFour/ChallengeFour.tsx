import {Link} from "react-router-dom";

const ChallengeFour = () => {

    const greetingMessage = "Hello, This Me everyDay All Day!"
    const currentDate = new Date().toDateString();

  return (
    <div>
      <h1>{greetingMessage}</h1>
      <h2>{currentDate}</h2>
        <Link to={"/"}>Home</Link>
    </div>
  )
}

export default ChallengeFour
