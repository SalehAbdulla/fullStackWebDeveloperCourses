import React from "react";
import cars from "./practice";

const Table = () => {

    // const tesla = cars[1];
    // const teslaTopSpeed = tesla["speedStats"].topSpeed;
    // const teslaTopColour = tesla["coloursByPopularity"][0];
    
    // const honda = cars[0];
    // const hondaTopSpeed = honda["speedStats"].topSpeed;
    // const hondaTopColour = honda["coloursByPopularity"][0];


    const [honda, tesla] = cars;

    const {speedStats: {topSpeed : teslaTopSpeed}} = tesla;
    const {speedStats: {topSpeed : hondaTopSpeed}} = honda;

    const {coloursByPopularity: [teslaTopColour]} = tesla;
    const {coloursByPopularity: [hondaTopColour]} = honda;

    console.log(hondaTopColour);

    return (
        <div>
            <table>
                <tr>
                    <th>Brand</th>
                    <th>Top Speed</th>
                </tr>
                <tr>
                    <td>{tesla.model}</td>
                    <td>{teslaTopSpeed}</td>
                    <td>{teslaTopColour}</td>
                </tr>
                <tr>
                    <td>{honda.model}</td>
                    <td>{hondaTopSpeed}</td>
                    <td>{hondaTopColour}</td>
                </tr>
            </table>
        </div>

    )
}


export default Table;