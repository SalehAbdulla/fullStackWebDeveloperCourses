import { useState } from "react";
import {Link} from "react-router-dom";

type MoviesProp = {
  id: number;
  title: string;
  ratings: number;
};

const LessonEleven = () => {
  const [movies, setMovies] = useState<MoviesProp[]>([
    {
      id: 1,
      title: "Equalizer 3",
      ratings: 7,
    },
  ]);

  const handleUpdateRandomly = (index: number) => {
    setMovies(
      movies.map((element, i) =>
        index === i
          ? {
              id: element.id,
              title: element.title,
              ratings: Math.floor(Math.random() * 11),
            }
          : element
      )
    );
  };

  return (
    <div>
      {movies.map((element, i) => (
        <div className="main-div">
          <h1 key={i}>Movie Title: {element.title}</h1>
          <h2 key={i}>Ratings: {element.ratings}</h2>
          <button onClick={() => handleUpdateRandomly(i)}>
            Update Rating Randomly
          </button>
        </div>
      ))}


      <Link to={"/"} >Back to Home</Link>
    </div>
  );
};

export default LessonEleven;
