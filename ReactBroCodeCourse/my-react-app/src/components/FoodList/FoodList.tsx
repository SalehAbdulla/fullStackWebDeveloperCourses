import "./FoodList.css";
import React, { useState } from "react";

export const FoodList = () => {
  const [foods, setFoods] = useState(["Apple", "Orange", "Banana"]);
  
  const handleAddFood = () => {
    const food = (document.getElementById("food-input") as HTMLInputElement)
      .value;
    setFoods((f) => [...f, food]);
    (document.getElementById("food-input") as HTMLInputElement).value = "";
  };

  const handleRemoveFood = (index: number) => {
    setFoods(foods.filter((_, i) => index !== i));
  };

  const handleKeyDown = <T extends HTMLElement>(event: React.KeyboardEvent<T>) => {
    if (event.key === "Enter") {
        handleAddFood();
    }
  };

  return (
    <div>
      <div>
        {foods.map((element, index) => (
          <li onClick={() => handleRemoveFood(index)} key={index}>
            {element}
          </li>
        ))}
      </div>

      <input onKeyDown={handleKeyDown} type="text" id="food-input"></input>
      <button onClick={handleAddFood}>Add Food</button>
    </div>
  );
};
