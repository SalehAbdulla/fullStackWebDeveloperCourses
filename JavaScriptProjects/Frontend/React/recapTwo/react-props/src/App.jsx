import './App.css';
import emojipedia from './components/Emojipedia';
import Emoji from './components/Card.jsx';



function createEntry(emojiTerm){
  return (
      <div>
          <Emoji 
            key={emojiTerm.id}
            emoji={emojiTerm.emoji}
            name={emojiTerm.name}
            description={emojiTerm.meaning}
          />
      </div>
  );
}


function App() {

  return (
    <div>
      <h1>Emoji Meaning</h1>
      <dl className="dictionary">{emojipedia.map(createEntry)}</dl>
    </div>
  )
}

export default App
