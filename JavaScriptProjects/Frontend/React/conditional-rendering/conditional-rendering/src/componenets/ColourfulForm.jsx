import React from "react";
import '../App.css';

const ColourfulForm = ()=>{

    const [color, setColour] = useState("white");

    function turnColorBlack(){
      setColour("black");
    }
  
    function turnColorwhite(){
      setColour("white");
    }

    return (
        <div>
        <form className='container'>
          <input type='text' placeholder='Enter Name' />
          <button onMouseOver={turnColorBlack} onMouseOut={turnColorwhite} style={{background: color}}>Submit</button>
        </form>
      </div>
    );
}


export default ColourfulForm;