import { useState } from "react";

const ExampleOne = () => {

    const [count, setCount] = useState(()=>{
        const initialCount = 10;
        return initialCount;
    })

  return (
    <div>
        <h1>{count}</h1>
        <button onClick={()=> setCount(count => count + 1)}>Increament</button>
    </div>
  )
}

export default ExampleOne
