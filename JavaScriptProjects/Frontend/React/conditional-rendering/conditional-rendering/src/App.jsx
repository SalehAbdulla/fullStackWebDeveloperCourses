import './App.css';
import Form from './componenets/Form';
import "./componenets/practice.js";
import Table from './componenets/Table.jsx';
import animals from './componenets/animals.js';

function App() {

  const [cat, dog] = animals;

  const {name : catName, sound: catSound, feedingRequiremnt: {food, water}} = cat;
  const {name: dogName, sound: dogSound} = dog;
  
  console.log(water);



  return (
    <>
      <div>
        <div className="container">

          <Form />
          <Table />

          

        </div>
      </div>
    </>
  )
}

export default App

