import React, { useState } from "react";

function CreateArea(props) {

  const [note, setNote] = useState({ title: "", content: "" });

  function handleOnChange(event) {

    const { name, value } = event.target;
    console.log({ [name]: value });
    setNote(prevValues => {
      return { ...prevValues, [name]: value };
    })
  }

  function sendNote(event) {
    event.preventDefault();
    props.catchNote(note);
    setNote({ title: "", content: "" });
  }

  return (
    <div>
      <form>
        <input value={note.title} onChange={handleOnChange} name="title" placeholder="Title" />
        <textarea value={note.content} onChange={handleOnChange} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={sendNote}>Add</button>
      </form>
    </div>
  );

}

export default CreateArea;
