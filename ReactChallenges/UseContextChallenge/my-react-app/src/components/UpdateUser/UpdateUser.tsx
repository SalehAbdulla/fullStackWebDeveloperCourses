import { useState } from "react";
import { useAppContext } from "../../context/UseAppContext";

const UpdateUser = () => {
  const { username, setUsername } = useAppContext();
  const [input, setInput] = useState("");

  const handleUpdateUsername = () => {
    setUsername(input);
  };

  return (
    <div>
      <h1>User Name = {username}</h1>
      <input
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInput(event.currentTarget.value)
        }
      />
      <button onClick={handleUpdateUsername}>Update UserName</button>
    </div>
  );
};

export default UpdateUser;
