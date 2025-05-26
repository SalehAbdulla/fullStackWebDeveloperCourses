import "../index.css";
import { ComponentB } from "../ComponentB/ComponentsB";
import { useState, createContext } from "react";

export const UserContext = createContext<string>("");

export const ComponentA = () => {

  const [user, setUser] = useState("BroCoder");

  return (
    <div className="box">
      <h1>ComponentA</h1>
      <h2>{`Hello ${user}`}</h2>

      <UserContext.Provider value={user}>
        <ComponentB />
      </UserContext.Provider>
    </div>
  );
};
