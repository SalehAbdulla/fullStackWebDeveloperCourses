// Test it

import { useAppContext } from "./context/useAppContext";

const App = () => {
  
  const { username } = useAppContext();

  return (
    <div>
      <h1>{username}</h1>
    </div>
  );

};

export default App;
