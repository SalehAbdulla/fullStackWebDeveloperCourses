var numbers = [3, 56, 2, 48, 5];

// function double(x){
//     return x * 2;
// }

// const newNumbers = numbers.map(numbers);
// console.log(newNumbers);

// var newNumbers = [];

// function double(x) {
//     newNumbers.push(x * 2);
// }

// numbers.forEach((x)=>{
//     newNumbers.push(x * 2);
// });

// Map => What map does is actually return an array without needing to initialise it, unlike the forEach loop it need an array and the we push the elements.
const numbersUsingMap = numbers.map((x) => {
    return x * 2;
})

console.log("Mapping nums = ", numbersUsingMap);

// Filter => it returns the values it certain conditions like > 10;

const numbersUsingFilter = numbers.filter((num)=>{
    return num > 20;
})

console.log("Filtering nums = ", numbersUsingFilter);

// Reduce function => //

const accumulator = numbers.reduce((accumlator, currNumber)=>{
    return accumlator + currNumber;
})

console.log("Using reduce function (Accumulator) = ", accumulator);

// Find function => find the first item that meats requirment
const foundFirstTen = numbers.find((num)=>{
    return num > 10;
})

console.log(foundFirstTen);

// FingIndex => find the index of first item the meats requirement

