import React from "react";


const Entry = (param) => {
    return (
        <div>
            <h1>{param.id}</h1>
            <h1>{param.emoji}</h1>
            <h1>{param.name}</h1>
            <p>{param.meaning}</p>
        </div>
    )
}


export default Entry;