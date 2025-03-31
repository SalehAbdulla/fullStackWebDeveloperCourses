import React from "react";

function Note() {

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button >DELETE</button>
    </div>
  );
}

export default Note;
