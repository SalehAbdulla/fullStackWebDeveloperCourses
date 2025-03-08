import './App.css';
import GreetingBasedOnTime from './components/GreetingBasedOnTime';
import RandomPictures from './components/RandomPictures';
import CalcLuckyNumber from './components/CalcLuckyNumber';
import List from './components/List';
import PI, { doublePi, troublePi } from './components/Math';
// or import * as pi, and then access them pi.doublePi();
import * as calc from './components/Calculator';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';

function App() {

  return (
    <>
      <Header />
      <Note />


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


        <Footer />

      </div>
    </>
  )
}

export default App
