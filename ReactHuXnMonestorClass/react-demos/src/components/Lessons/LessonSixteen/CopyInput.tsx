import { useState } from "react";
import PopupContent from "./PopupContent";
import { Link } from "react-router-dom";

const CopyInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyInput = () => {
    navigator.clipboard.writeText(inputValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(event.currentTarget.value)
        }
      />
      <button onClick={handleCopyInput}>Copy Input</button>
      <PopupContent copied={copied} />

      <Link to={"/"}>Back To Home</Link>
    </div>
  );
};

export default CopyInput;
