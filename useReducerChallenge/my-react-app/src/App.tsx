import Counter from "./component/Counter";
import { UseAppContext } from "./context/UseAppContext";

const App = () => {
  const { username, setUsername } = UseAppContext();

  return (
    <div>
      <h1
        onClick={() =>
          username === "SALEH" ? setUsername("ABDULLA") : setUsername("SALEH")
        }
      >
        {username}
      </h1>

        <Counter />

    </div>
  );
};

export default App;
