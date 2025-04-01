import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {

  const [allNotes, setAllNotes] = useState([]);

  function catchNote(note){
    setAllNotes(prevValues => {
      return [...prevValues, note];
    })
    
  }

  return (
    <div>
      <Header />
      <CreateArea catchNote={catchNote} />
      {allNotes.map((note, index) => <Note key={index} id={index} title={note.title} content={note.content}/>)}
      <Footer />
    </div>
  );
}

export default App;
