import emojipedia from "./emojipedia.js";


const array = emojipedia.map((meaning)=>{
    return meaning["meaning"].substring(1, 10);
});



console.log(array);
