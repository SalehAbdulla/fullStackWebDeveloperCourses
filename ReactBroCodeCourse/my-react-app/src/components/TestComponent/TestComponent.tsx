import "./TestComponent.css";
import React, { useState } from "react";

type Car = {
  name: string;
  model: string;
  make: number;
};

export const TestComponent = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const handleAddCar = () => {
    setCars((cars) => [
      ...cars,
      { name: carName, model: carModel, make: carMake },
    ]);

    setCarName("");
    setCarMake(new Date().getFullYear());
    setCarModel("");
  };

  const handleKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>
  ) => {
    if (event.key === "Enter") {
      handleAddCar();
    }
  };

  const handleRemoveCar = (index: number) => {
    setCars(cars.filter((_, i) => index != i));
  };

  const [carName, setCarName] = useState("");
  const handleCarName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarName(event.currentTarget.value);
  };

  const [carModel, setCarModel] = useState("");
  const handleCarModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarModel(event.currentTarget.value);
  };

  const [carMake, setCarMake] = useState(new Date().getFullYear());
  const handleCarMake = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarMake(Number(event.currentTarget.value));
  };

  return (
    <div>
      <h1>Hello World</h1>

      <div className="car-div">
        <h2>All Cars Added</h2>
        <ul>
          {cars.map((car, index) => (
            <li onClick={() => handleRemoveCar(index)} key={index}>
              {car.make} {car.name} {car.model}
            </li>
          ))}
        </ul>
      </div>

      <div className="form-div">
        <input
          onChange={handleCarName}
          value={carName}
          placeholder="Car name"
        />
        <input
          onChange={handleCarModel}
          value={carModel}
          placeholder="Car Model"
        />
        <input
          onKeyDown={handleKeyDown}
          onChange={handleCarMake}
          value={carMake}
          placeholder="Car Make"
        />
        <button onClick={handleAddCar}>Add Car</button>
      </div>
    </div>
  );
};
