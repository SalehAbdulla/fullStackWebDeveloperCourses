import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {


  const [notes, setNotes] = useState([]);

  // - Add new note to an array.
  //- Take array and render seperate Note components for each item.

  function getNotes(note) {
    setNotes(prevValue => {
      return [...prevValue, note];
    })
  }

  return (
    <div>
      <Header />
      <CreateArea getNotes={getNotes} />
      {notes.map((note) => { <Note title={note.title} content={note.content} /> })}
      <Footer />
    </div>
  );
}

export default App;
