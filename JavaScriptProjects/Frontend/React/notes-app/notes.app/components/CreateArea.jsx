import React, { useState } from "react";

function CreateArea(props) {

  const [note, setNote] = useState({ title: "", content: "" });

  function handleOnChange(event) {
    const { name, value } = event.target;
    setNote(preValues => {
      return { ...preValues, [name]: value };
    })
  }

  function handleOnClick(event){
    event.preventDefault();
    props.addToNotes(note);
  }

  return (
    <div>
      <form>
        <input value={note.title} onChange={handleOnChange} name="title" placeholder="Title" />
        <textarea value={note.content} onChange={handleOnChange} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={handleOnClick} >Add</button>
      </form>
    </div>
  );
  
}

export default CreateArea;
