import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

function App() {

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevValues => {
      return [...prevValues, newNote];
    })
  }



  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => <Note key={index} title={noteItem.title} content={noteItem.content}/>)}
      <Footer />
    </div>
  );
}

export default App;
