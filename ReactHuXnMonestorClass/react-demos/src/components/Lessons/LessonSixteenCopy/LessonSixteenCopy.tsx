// copy application

import { useState } from "react";
import ShowUpCopies from "./ShowUpCopies";


const LessonSixteenCopy = () => {
  const [input, setInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopying = () => {
    // navigator.clipboard.writeText(input) this is enough to copy the text
    navigator.clipboard.writeText(input).then(()=> {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  return (
    <div>
      <input onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setInput(event.currentTarget.value)} value={input} placeholder="Enter A Value"/>
      <button onClick={handleCopying}>Copy</button>
      <ShowUpCopies isCopied={isCopied}  />
    </div>
  )
}

export default LessonSixteenCopy
