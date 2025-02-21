import React from "react";
import EmojiCard from "./components/EmojiCard";
import emojipedia from "../emojipedia";

function App() {
  return (
    <div>
      {emojipedia.map((emoji) => <EmojiCard key={emoji.id} emoji={emoji.emoji} name={emoji.name} meaning={emoji.meaning} />)}
    </div>
  )
}

export default App
