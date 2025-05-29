import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const LessonFifteen = () => {

    const [myName, setMyName] = useState(()=>{
        const getSavedName = localStorage.getItem("name");
        return getSavedName ? JSON.parse(getSavedName) : "";
    })

    useEffect(()=> {
        localStorage.setItem("name", JSON.stringify(myName));
    }, [myName]);



  return (
    <div>
      <h1>Local Storage Saved Name: {myName}</h1>
      <input type="text" placeholder="Enter Your Name" onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setMyName(event.currentTarget.value)} value={myName}/>
    <button onClick={()=> setMyName("")} >Clear</button>

    <Link to={"/"}>Back To Home</Link>
    </div>
  )
}

export default LessonFifteen
