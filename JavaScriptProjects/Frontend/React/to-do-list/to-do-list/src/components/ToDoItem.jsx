import React, { useState } from "react";


const ToDoItem = (props) => {

    const itemsAll = props.value;

    const [isDone, setIsDone] = useState(false);

    function handleOnClick() {
        
        console.log("Print Something");
        if (!isDone) {
            setIsDone(true);
        } else {
            setIsDone(false);
        }
    }

    return (
        <>
            <div>
                <ul>
                    {itemsAll.map((item) => <li
                        onClick={handleOnClick}
                        style={{textDecoration: (isDone) ? "Line-through": null}}
                    > {item} </li>)}
                </ul>
            </div>
        </>
    )
}



export default ToDoItem;


