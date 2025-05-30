import { UseAppContext } from "./context/UseAppContext";

const App = () => {
  const { username, inputElement } = UseAppContext();
  console.log(inputElement);

  const focusInput = () => {
    if (inputElement.current) {
      inputElement.current?.focus();
      inputElement.current.value = "Saleh Abdulla";
      
    }
    
  };

  return (
    <div>
      <h1>{username}</h1>
      <input type="text" ref={inputElement} />
      <button onClick={() => focusInput()}>Focus & Write Saleh Abdulla</button>
    </div>
  );
};

export default App;
