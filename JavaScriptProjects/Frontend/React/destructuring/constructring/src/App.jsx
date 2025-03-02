import './App.css'
import animals from './data'
import cars from './practice'


const [honda, tesla] = cars;
const {speedStats : {topSpeed: hondaTopSpeed}} = honda;
const {speedStats: {topSpeed : teslaTopSpeed}} = tesla;

const {coloursByPopularity: [hondaTopColour]} = honda;
const {coloursByPopularity: [teslaTopColour]} = tesla;

function App() {
  
  return (
    <>
      <div>
        <table>
          <tr>
            <th>Brand</th>
            <th>Top Speed</th>
          </tr>
          <tr>
            <td>{tesla.model}</td>
            <td>{teslaTopSpeed}</td>
            <td>{teslaTopColour}</td>
          </tr>
          <tr>
            <td>{honda.model}</td>
            <td>{hondaTopSpeed}</td>
            <td>{hondaTopColour}</td>
          </tr>
        </table>
      </div>
    </>
  )
}


export default App
