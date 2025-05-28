import "./CrudApp.css";
import { useState } from "react";
import {Link } from "react-router-dom";

const CrudPractice = () => {

    const [friends, setFriends] = useState(["MEEEEEEE", "WORK"]);
    const addFriends = () =>{
        setFriends(friends => [...friends, "OQP"]);
    }
    const removeFriend = (index: number) =>{
        setFriends(friends.filter((_, i) => index !== i));
    }
    const updateFriends = (index: number) =>{
        setFriends(
            friends.map((friend, i) => (i === index ? "Updated OQP" : friend)
        ));
    }

  return (
    <div>

        <ul>
            {friends.map((element, i) => <li key={i}>{element}</li>)}
        </ul>

      <div>
        <button onClick={addFriends}>addFriends</button>
        {"  "}
        <button onClick={() => removeFriend(Math.floor(Math.random() * friends.length))}>removeFriend</button>
        {"  "}
        <button onClick={() => updateFriends(Math.floor(Math.random() * friends.length))}>updateFriends</button>
      </div>

        <Link style={{color:"black"}} to={"/"}>Back To Home</Link>

    </div>
  )
}

export default CrudPractice
