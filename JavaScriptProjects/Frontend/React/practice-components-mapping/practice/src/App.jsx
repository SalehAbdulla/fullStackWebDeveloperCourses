import React from 'react';
import './App.css';
import Entry from './components/Entry';
import emojipedia from '../emojipedia';


function App() {

  return (
    <>
    
      <div>
        {emojipedia.map(param => (
          <Entry
            key={param.id}
            emoji={param.emoji}
            name={param.name}
            meaning={param.meaning}
          />
        ))}
      </div>

    </>
  )
}


export default App
