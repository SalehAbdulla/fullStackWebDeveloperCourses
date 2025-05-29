import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const ChallengeEleven = () => {

   const [count, setCount] = useState(0);
   
   useEffect(()=> {
      document.title = `Counter Page`
      console.log(`Component Mounts for the first time`);
   },[])


  return (
    <div>
      <h1>Count = {count}</h1>
      <button onClick={()=> setCount(count => count + 1)}>Increment</button>
      <Link to={"/challengeEleven2"}>Part 2 of the challenge</Link>
    </div>
  )
}

export default ChallengeEleven
