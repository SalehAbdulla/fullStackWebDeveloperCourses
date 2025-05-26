import "../index.css";
import { ComponentC } from "../ComponentC/ComponentC";
import { useContext } from "react";

import { UserContext } from "../ComponentA/ComponentA";

// useContext() = > React Hook that allows us to share values
//                  between multiple levels of components
//                  without passing props through each level

// Provider component
// 1. import {createContext} from 'react'; // import it 
// 2. export const MyContext = createContext; // inisilise it
// 3. <MyContext.Provider value={value}> </MyContext.Provider> // Wrap it

// consumer Component
// 1. import {useContext} from 'react'; // import useContext
// import { UserContext } from './ComponentA'; // import the object
// 2. const value = useContext(MyContext);  // use it


export const ComponentB = () => {

    const user = useContext(UserContext);


  return (
    <div className="box">
      <h1>ComponentB</h1>
      <h2>{user}</h2>
      <ComponentC />
    </div>
  );
};
