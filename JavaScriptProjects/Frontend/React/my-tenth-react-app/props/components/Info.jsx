import React from "react";
import "./Card.css"

const Info = (info) => {
    return (
        <div>
            <p className="info">{info.info}</p>
        </div>
    )
}

export default Info