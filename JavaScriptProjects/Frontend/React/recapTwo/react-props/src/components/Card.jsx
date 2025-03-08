import React from "react";

const Card = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>

            <img
                src={props.img}
                alt={props.name}
            />
            <p>{props.number}</p>
            <p>{props.email}</p>
        </div>
    );
}


export default Card;