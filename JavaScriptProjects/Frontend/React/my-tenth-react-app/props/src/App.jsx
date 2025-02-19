import './App.css';
import Card from "../components/Card";
import contacts from '../components/contants';
import Avatar from '../components/Avatar';

function App() {

  return (
    <div>
      <Avatar imgURL="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg" />
      {contacts.map(contact => (<Card name={contact.name} imgURL={contact.imgURL} email={contact.email} phone={contact.phone}/> ))}
    </div>
  );
  
}

export default App;
