import React from "react";

const GreetingBasedOnTime = () => {

    let greeting = "";
    const time = new Date().getHours();

    const customStyle = {
        color: "purple",
        fontSize: "80px",
        border: "1px solid white",

    };

    if (time >= 0 && time < 12) {
        customStyle.color = "blue";
        greeting = "Happy morning";
    } else if (time >= 12 && time < 18) {
        customStyle.color = "red";
        greeting = "Happy afternoon"
    } else if (time >= 18) {
        customStyle.color = "green";
        greeting = "Happy evening";
    }

    return (
        <>
            <div>
                <h1 style={customStyle} >{greeting}</h1>
            </div>
        </>
    );
};

export default GreetingBasedOnTime;