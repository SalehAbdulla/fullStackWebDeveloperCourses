import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Note from './components/Note';
import notes from './notes.js';


function App() {

  return (
    <>
      <div>
        <Header />
          {notes.map((note) => <Note key={note.key} title={note.title} content={note.content} />)}
        <Footer />
      </div>
    </>
  )
}

export default App
