import './App.css'

function App() {


  const fName = "Saleh";
  const lName = "Abdulla";

  const luckyNumber = Math.floor(Math.random() * 10);

  return (
    <>
      <div>
        <h1> Hello {fName} {lName} 💕</h1>
        <ul>

        <p>my luck number is: {luckyNumber}</p>


        </ul>
      </div>

    </>
  )
}

export default App
