import React, { useState } from "react";

function CreateArea(props) {


  const [note, setNote] = useState({ title: "", content: "" });


  function handleOnChange(event) {
    const { name, value } = event.target;
    setNote(prevValues => {
      return {...prevValues, [name]: value }
    })
  }

  function submitNote(event){
    event.preventDefault();
    props.onAdd(note);

  }

  return (
    <div>
      <form>
        <input name="title" onChange={handleOnChange} value={note.title} placeholder="Title" />
        <textarea name="content" onChange={handleOnChange} value={note.content} placeholder="Take a note..." rows="3" />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
