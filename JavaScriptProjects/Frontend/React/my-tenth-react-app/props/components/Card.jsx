import React from "react";
import ReactDOM from "react-dom";



const Card = (props) => {

    return (
        <div>
            <h1>{props.id}</h1>
            <h1>{props.title}</h1>
            <h2>{props.name}</h2>
            <img src={props.url} alt={props.name} />
        </div>
    )
}



export default Card