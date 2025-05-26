
import { useRef, useEffect } from "react";

export const StopWatch = () => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component Rendered");
    console.log(inputRef1);
  }, []); 

  const handleClick1 = () => {
    if (inputRef1.current && inputRef2.current && inputRef3.current) {
      inputRef1.current.focus();
      inputRef1.current.style.backgroundColor = "yellow";
      inputRef2.current.style.backgroundColor = "";
      inputRef3.current.style.backgroundColor = "";
    }
  };

  const handleClick2 = () => {
    if (inputRef1.current && inputRef2.current && inputRef3.current) {
      inputRef2.current.focus();
      inputRef1.current.style.backgroundColor = "";
      inputRef2.current.style.backgroundColor = "yellow";
      inputRef3.current.style.backgroundColor = "";
    }
  };

  const handleClick3 = () => {
    if (inputRef1.current && inputRef2.current && inputRef3.current) {
      inputRef3.current.focus();
      inputRef1.current.style.backgroundColor = "";
      inputRef2.current.style.backgroundColor = "";
      inputRef3.current.style.backgroundColor = "yellow";
    }
  };

  return (
    <div>
      <button onClick={handleClick1}>Click Input 1</button>
      <input ref={inputRef1} />
      <br />

      <button onClick={handleClick2}>Click Input 2</button>
      <input ref={inputRef2} />
      <br />

      <button onClick={handleClick3}>Click Input 3</button>
      <input ref={inputRef3} />
    </div>
  );
};
