import axios from "axios";
import { useState, useEffect } from "react";
import "./Meals.css";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => setMeals(res.data.meals))
      .catch((err) => console.log(err));
  }, []);

  const getMealsComponetns = meals.map(({ strMeal, strMealThumb, idMeal }) => (
    <section className="container">
      <section className="card">
        <img src={strMealThumb} alt={strMeal} />
      </section>
      <section className="content">
        <p>{strMeal}</p>
        <p>#{idMeal}</p>
      </section>
    </section>
  ));

  return <div className="items-container">{getMealsComponetns}</div>;
};

export default Meals;
