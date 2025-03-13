import './App.css';
import Form from './componenets/Form';


const isRegistered = true;

function App() {

  return (
    <>
      <div>
        <div className="container">

          <Form isRegistered={isRegistered}/>

        </div>
      </div>
    </>
  )
}

export default App
