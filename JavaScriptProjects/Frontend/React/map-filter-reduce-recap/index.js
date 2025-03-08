var numbers = [3, 54, 2, 48, 5];
console.log(numbers);

// Map - Create a new array by doing something with each item

function double(x){
    return x * 2;
}

const newNumbers = numbers.map(double);
console.log(newNumbers);


var newNumbersUsingForEach = [];

numbers.forEach((x)=> {
    newNumbersUsingForEach.push(x * 2);
});

console.log(newNumbersUsingForEach)

// --------------

const newNumbersUsingFilter = numbers.filter((x)=>{
    // particular cratiria
    return x < 10;
});

console.log(newNumbersUsingFilter);

// --------------

