import UpdateUser from "./components/UpdateUser/UpdateUser";
import UserProfile from "./components/UserProfile/UserProfile";
import { useAppContext } from "./context/UseAppContext";

const App = () => {

  const {username, setUsername} = useAppContext();

  return (
    <div>
      <h1 onClick={()=> username === "Saleh" ? setUsername("Abdulla") : setUsername("Saleh")}>{username}</h1>
      <UserProfile />
      <UpdateUser/>
    </div>
  )
}

export default App
