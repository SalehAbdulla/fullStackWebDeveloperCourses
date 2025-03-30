import React, { useState } from "react";

function CreateArea(props) {

  //- Create a constant that keeps track of the title and content.

  const [notes, setNotes] = useState({ title: "", content: "" });

  function handleOnChange(event) {
    const { name, value } = event.target;
    setNotes(prevValue => {
      return { ...prevValue, [name]: value };
    })
  }


  //- Pass the new note back to the App.
  function passNote(event){
    event.preventDefault();
    props.getNotes(notes);
  }

  return (
    <div>
      <form>
        <input onChange={handleOnChange} name="title" placeholder="Title" />
        <textarea onChange={handleOnChange} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={passNote} >Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
