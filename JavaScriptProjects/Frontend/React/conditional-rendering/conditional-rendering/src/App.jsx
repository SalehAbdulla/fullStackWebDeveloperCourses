import './App.css';
import Form from './componenets/Form';

var isLoggedIn = false;


function App() {

  return (
    <>
      <div>
        <div className="container">

          {isLoggedIn ? (<h1>Hello</h1>) : <Form />}

        </div>
      </div>
    </>
  )
}

export default App
