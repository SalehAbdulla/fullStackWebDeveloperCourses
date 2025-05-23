import "./OnChangeStateComponent.css";
import { useState } from "react";

// In this training priod, we will use OnChange() function, and connected with the state
// onChange Usualy used in forms, so, we are going to use Four cases:
// <input/>, <textarea/>, <select/>, and <radio/>

export const OnChangeStateComponent = () => {
  {
    /*This is input state */
  }
  const [input, setInput] = useState("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const [textArea, setTextArea] = useState("");
  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(event.currentTarget.value);
  };

  const [select, setSelect] = useState("");
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.currentTarget.value);
  };

  const [radio, setRadio] = useState("");
  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(event.currentTarget.value);
  };

  return (
    <div>
      <div>
        <p>Input = {input}</p>
        <input value={input} onChange={handleInput} />
        <br />
      </div>

      <div>
        <p>Text Area = {textArea}</p>
        <textarea value={textArea} onChange={handleTextArea}></textarea>
      </div>

      <div>
        <p>Select = {select}</p>
        <select value={select} onChange={handleSelect}>
          <option>Please select a Payment Method</option>
          <option>Benefit Pay</option>
          <option>Visa Card</option>
          <option>Master Card</option>
        </select>
      </div>

      <div>
        <p>Radio = {radio}</p>
        <label>
          <input name="method" type="radio" value="Delivery"onChange={handleRadio} checked={radio === "Delivery"}></input>
          Delivery
        </label>

        <label>
          <input name="method" type="radio" value="Pick Up" onChange={handleRadio} checked={radio === "Pick Up"}></input>
          Pick Up
        </label>
      </div>
    </div>
  );
};
