import React from "react";


const Form = ()=>{
    return (
        <div>
            <form className="form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
    );
}


export default Form;