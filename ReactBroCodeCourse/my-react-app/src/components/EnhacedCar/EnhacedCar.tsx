import "./EnhacedCar.css";
import { useState } from "react";

type Car = {
  year: number;
  make: string;
  model: string;
};

export const EnhacedCar = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const handleAddCar = () => {
    setCars((c) => [...c, { year: yearCar, make: makeCar, model: modelCar }]);
    setYearCar(new Date().getFullYear());
    setMakeCar("");
    setModelCar("");
  };

  const handleKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>
  ) => {
    if (event.key === "Enter") {
      handleAddCar();
    }
  };

  const handleRemoveCar = (index: number) => {
    setCars((cars) => cars.filter((_, i) => index !== i));
  };

  const [yearCar, setYearCar] = useState(new Date().getFullYear());
  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearCar(Number(event.currentTarget.value));
  };

  const [makeCar, setMakeCar] = useState("");
  const handleChangeMake = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMakeCar(event.currentTarget.value);
  };

  const [modelCar, setModelCar] = useState("");
  const handleChangeModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelCar(event.currentTarget.value);
  };

  return (
    <div>
      <div className="car-list">
        <h2>Car Selector</h2>
        <ul>
          {cars.map((car, index) => (
            <li onClick={() => handleRemoveCar(index)} key={index}>
              {car.make} {car.model} {car.year}
            </li>
          ))}
        </ul>
      </div>

      <div className="car-form">
        <input onChange={handleChangeYear} value={yearCar} />
        <input onChange={handleChangeMake} value={makeCar} />
        <input
          onKeyDown={handleKeyDown}
          onChange={handleChangeModel}
          value={modelCar}
        />
        <button onClick={handleAddCar}>Select Car</button>
      </div>
    </div>
  );
};
