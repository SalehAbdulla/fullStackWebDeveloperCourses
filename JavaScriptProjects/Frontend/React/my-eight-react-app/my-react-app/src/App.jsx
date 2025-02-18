import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import add from "./calc"
import {subtract, divide, multiply} from "./calc";
// import * as calc from './calc.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <h1>{add(5, 2)}</h1>
        <h1>{subtract(5, 2)}</h1>
        <h1>{divide(4, 2)}</h1>
        <h1>{multiply(8, 2)}</h1>
    </div>
  )
}

export default App
