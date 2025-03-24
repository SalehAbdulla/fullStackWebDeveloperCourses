import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


const array1 = ["apple", "oranges", "banana"];
const array2 = ["Lime", "limon", ...array1];

const fullName = {
  fName: "James",
  lName: "Bond"
};

const user = {
  ... fullName,
  id: 1,
  username: "jamesbound007"
}


console.log(user);
