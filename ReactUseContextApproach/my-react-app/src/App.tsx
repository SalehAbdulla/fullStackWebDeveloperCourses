// Test it 
import { useEffect } from "react";
import { useAppContext } from "./context/useAppContext";

const App = () => {

  const {username, setUsername} = useAppContext();

  useEffect(()=> {
    localStorage.setItem("name", username);
  },[username]);

  return (
    <div>
      <h1>{username}</h1>
      <button onClick={()=> setUsername("ABDULLA")}>LastName</button>
    </div>
  )
}

export default App
