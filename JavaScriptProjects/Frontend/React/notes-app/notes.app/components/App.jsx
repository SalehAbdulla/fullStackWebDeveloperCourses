import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {

  const [notes, setNotes] = useState([]);

  function addToNotes(note) {
    setNotes(prevValue => {
      return [...prevValue, note];
    })
  }

  return (
    <div>
      <Header />
      <CreateArea addToNotes={addToNotes} />
      {notes.map((note, index) => <Note key={index} id={index} title={note.title} content={note.content} />)}
      <Footer />
    </div>
  );
}

export default App;
