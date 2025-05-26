import { useEffect, useRef } from "react";
import "./UseRefComponent.css";

export const UseRefComponent = () => {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component Rendered");
    console.log(inputRef1);
  }, []);

  const handleOnClick = () => {
    if (inputRef1.current) {
      inputRef1.current.focus();
      inputRef1.current.style.backgroundColor = "yellow";
      inputRef2.current.style.backgroundColor = "";
      inputRef3.current.style.backgroundColor = "";
    }
  };
  const handleOnClick2 = () => {
    if (inputRef2.current) {
      inputRef2.current.focus();
      inputRef1.current.style.backgroundColor = "";
      inputRef2.current.style.backgroundColor = "yellow";
      inputRef3.current.style.backgroundColor = "";
    }
  };
  const handleOnClick3 = () => {
    if (inputRef3.current) {
      inputRef3.current.focus();
      inputRef1.current.style.backgroundColor = "";
      inputRef2.current.style.backgroundColor = "";
      inputRef3.current.style.backgroundColor = "yellow";
    }
  };

  return (
    <div>
      <button onClick={handleOnClick}>Click Me! 1</button>
      <input ref={inputRef1} />
      <br />
      <button onClick={handleOnClick2}>Click Me! 2</button>
      <input ref={inputRef2} />
      <br />
      <button onClick={handleOnClick3}>Click Me! 3</button>
      <input ref={inputRef3} />
    </div>
  );
};
