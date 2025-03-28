import React from "react";
import { useState } from "react";

const ToDoList = (props) => {
    return (
        <>
            <li onClick={()=> {props.onChecked(props.id)} }>{props.item}</li>
        </>
    )
}

export default ToDoList;