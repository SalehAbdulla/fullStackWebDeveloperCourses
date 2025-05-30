import { UseAppContext } from "../../context/UseAppContext"

const FocusInput = () => {

  const {currentInput} = UseAppContext();
  
  const handleFocus = ()=> {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }

  return (
    <div>
      <h1>Focus Input Application</h1>
      <input ref={currentInput} placeholder="Enter a value"/>
      <button onClick={handleFocus}>FOCUS</button>
    </div>
  )

}

export default FocusInput
