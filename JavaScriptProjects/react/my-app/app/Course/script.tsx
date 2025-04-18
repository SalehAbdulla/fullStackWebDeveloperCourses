function getFirstElement<T>(array: T[] ){
    return array[0];
}

const numbers = [1, 2, 3];
const firstNum = getFirstElement(numbers);

const strings = ["sf", "fs"];
const firstString = getFirstElement(strings);

const input = document.querySelector<HTMLInputElement>(".input");
input?.value

