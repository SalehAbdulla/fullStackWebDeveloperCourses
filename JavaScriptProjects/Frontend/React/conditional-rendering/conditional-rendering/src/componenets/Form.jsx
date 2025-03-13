import React, {useState} from "react";


const Form = (prop)=>{

    const [count, setCount] = useState(0);

    //const [r, g, b] = [9, 132, 227];

    function addOne(){
        setCount(count + 1);
    }

    function subtractOne(){
        setCount(count - 1);
    }


    return (
        <div>
            <h1>{count}</h1>
            <button onClick={addOne}> Add one ++</button>
            <button onClick={subtractOne}> subtract one --</button>
        </div>
    );
}


export default Form;