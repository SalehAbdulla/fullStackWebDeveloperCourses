import React, { useState } from "react";
import "../App.css";
import animals from "../../../../destructuring/constructring/src/data";

function App() {


    return (
        <div className="container">
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
    );

    
}

export default App;
