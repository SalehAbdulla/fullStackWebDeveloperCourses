import React from "react";

const CalcLuckyNumber = ({fName}) =>{   

    const getLuckNumber = Math.floor(Math.random() * 11);

    return (
        <>
        <div>
            <h1> Hello {fName} 💕</h1>
            <h1>Your Lucky Number is = {getLuckNumber}</h1>
        </div>
        </>
    );
}

export default CalcLuckyNumber;