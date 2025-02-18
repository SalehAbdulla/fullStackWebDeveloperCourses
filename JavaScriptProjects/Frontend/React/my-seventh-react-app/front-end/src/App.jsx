import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/MovieCard'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'



const App = () => {

  const movieNumber = 2;


  return (
    <div>
      <Home />
    </div>
  )
}



export default App
