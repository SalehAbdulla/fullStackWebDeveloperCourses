import "./App.css";
import UserGreeting from "../src/components/UserGreeting/UserGreeting.tsx";

function App() {


  return (
    <>
      <UserGreeting isLoggedIn={true}/>
    </>
  );
}

export default App;
