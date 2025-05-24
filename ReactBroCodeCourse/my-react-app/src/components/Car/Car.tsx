import "./Car.css";
import React, { useState } from "react";

export const Car = () => {
  const [car, setCar] = useState({
    year: 2024,
    make: "Ford",
    model: "Mustang",
  });

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, year: Number(event.currentTarget.value) });
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, make: event.currentTarget.value });
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, model: event.currentTarget.value });
  };

  return (
    <div className="main-div">
      <p>
        You favorite car is: {car.year} {car.make} {car.model}
      </p>
      <div className="sec-div">
        <label>Year: </label>
        <input type="number" onChange={handleYearChange} value={car.year} />

        
        <label>Model: </label>
        <input type="text" onChange={handleMakeChange} value={car.make} />

       
        <label>Make: </label>
        <input type="text" onChange={handleModelChange} value={car.model} />
        
      </div>
    </div>
  );
};
