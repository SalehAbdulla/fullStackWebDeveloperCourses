import { UseAppContext } from "../../context/UseAppContext";


const UserName = () => {

  const { username, setUsername } = UseAppContext();

  return (
    <div>
      <h1
        onClick={() =>
          username === "Saleh" ? setUsername("Abdulla") : setUsername("Saleh")
        }
      >
        Hello {username}
      </h1>
    </div>
  );
};

export default UserName;
