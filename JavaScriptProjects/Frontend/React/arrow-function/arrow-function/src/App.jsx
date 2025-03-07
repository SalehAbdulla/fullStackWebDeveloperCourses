import React from 'react';
import './App.css'
import emojipedia from '../emojipedia';
import Entry from '../components/Entry';

function createEntry(entry){
  return (
    < Entry
      key={entry.id}
      emoji={entry.emoji}
      name={entry.name}
      description={entry.meaning}    
    />
  )
}


const App = () => {
  return (
    <div>
      <span> emojipedia </span>
      <dl>{emojipedia.map(createEntry)}</dl>
    </div>
  )
}

export default App
