import { useState } from "react";
import "./CrudApp.css";
import { Link } from "react-router-dom";
const CrudApp = () => {
  const [friends, setFriends] = useState(["Alex", "John"]);
  const addOneFriend = () => {
    setFriends((friends) => [...friends, "AnotherFriend"]);
  };

  const removeFriend = (index: number) => {
    setFriends((friends) => friends.filter((_, i) => i !== index));
  };

  const updateFriend = (index: number) => {
    setFriends(
      friends.map((element, i) => (i === index ? "Changed" : element))
    );
  };

  return (
    <section className="friends-div">
      {friends.map((friend, i) => (
        <li onClick={() => removeFriend(i)} key={i}>
          {friend}
        </li>
      ))}
      <button onClick={addOneFriend}>Add New Friend</button>
      <button
        onClick={() => removeFriend(Math.floor(Math.random() * friends.length))}
      >
        Remove Random Friend
      </button>
      <button
        onClick={() => updateFriend(Math.floor(Math.random() * friends.length))}
      >
        Update Random Friend
      </button>

      <Link to={"/crudPractice"}>Practice CRUD APP</Link>
      
    </section>
  );
};

export default CrudApp;
