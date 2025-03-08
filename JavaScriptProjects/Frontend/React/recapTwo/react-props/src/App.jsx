import './App.css';
import Card from './components/Card';
import contacts from './components/contacts';

function createCard(contact){
  return <Card 
    name={contact.name}
    img={contact.imgURL}
    number={contact.phone}
    email={contact.email}
  />
}


function App() {

  return (
    <div>

        {contacts.map(createCard)}

    </div>
  )
}

export default App
