import './App.css';
import GreetingBasedOnTime from './components/GreetingBasedOnTime';
import RandomPictures from './components/RandomPictures';
import CalcLuckyNumber from './components/CalcLuckyNumber';
import List from './components/List';
import PI, { doublePi, troublePi } from './components/Math';
// or import * as pi, and then access them pi.doublePi();
import * as calc from './components/Calculator';


function App() {

  return (
    <>

      <div>

        <CalcLuckyNumber fName="Saleh" />
        <GreetingBasedOnTime />
        <RandomPictures />
        <List />

        <br />

        <div>
          <h4>Pi={PI}</h4>
          <h4>Double Pi={doublePi()} </h4>
          <h4>Trouble Pi={troublePi()} </h4>
        </div>

        <br />
        // or we can access directly without an alies
        <div>
          <ul>
            <li>
              <h4>{calc.addition(5, 4)}</h4>
            </li>
            <li>
              <h4>{calc.subtract(5, 4)}</h4>
            </li>
            <li>
              <h4>{calc.multiply(5, 4)}</h4>
            </li>
            <li>
              <h4>{calc.divide(5, 4)}</h4>
            </li>
          </ul>
        </div>


      </div>
    </>
  )
}

export default App
