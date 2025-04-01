import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {

  const [allNotes, setAllNotes] = useState([]);

  function catchNote(note) {
    setAllNotes(prevValues => {
      return [...prevValues, note];
    })

  }

  function deleteNote(id) {
    setAllNotes(prevValues => {
      return prevValues.filter((value, index) => {
        return index !== id;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea catchNote={catchNote} />
      {allNotes.map((note, index) => <Note deleteNote={deleteNote} key={index} id={index} title={note.title} content={note.content} />)}
      <Footer />
    </div>
  );
}

export default App;
