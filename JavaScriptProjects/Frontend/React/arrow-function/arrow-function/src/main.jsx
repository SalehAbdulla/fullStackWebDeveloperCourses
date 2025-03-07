import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
const newNumbers = numbers.map((x) => x *= 2);
console.log("numbers powered by 2 ", newNumbers);

//////Filter - Create a new array by keeping the items that return true.
// const newNumbers = numbers.filter(function(num) {
//   return num < 10;
// });

const numbersLessThanTen = numbers.filter(x => x < 10);
console.log("Numbers < 10 are = ", numbersLessThanTen);


//Reduce - Accumulate a value by doing something to each item in an array.
// var newNumber = numbers.reduce(function (accumulator, currentNumber) {
//     return accumulator + currentNumber;
// })

const numbersTotal = numbers.reduce((acc, val)=> val + acc);
console.log(numbersTotal);

////Find - find the first item that matches from an array.
// const newNumber = numbers.find(function (num) {
//   return num > 10;
// })

const findFirstNumGreaterThanTen = numbers.find((num) => num > 10);
console.log(findFirstNumGreaterThanTen);

////FindIndex - find the index of the first item that matches.
// const newNumber = numbers.findIndex(function (num) {
//   return num > 10;
// })

const findIndexOfFirstNumGreaterThanTen = numbers.findIndex((num)=> num > 10);
console.log(findIndexOfFirstNumGreaterThanTen);

