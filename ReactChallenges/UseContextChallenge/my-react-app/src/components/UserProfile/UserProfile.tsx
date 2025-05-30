import { useAppContext } from "../../context/UseAppContext";

const UserProfile = () => {
  const { counter, setCounter } = useAppContext();

  return <div>
   <h1>{counter}</h1>
   <button onClick={()=> setCounter(counter + 1)}>Increment</button>
  </div>;
};

export default UserProfile;
