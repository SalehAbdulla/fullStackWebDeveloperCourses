import { useState } from "react";
import { Link } from "react-router-dom";

const LessonTwelve = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Spider Man", ratings: 8 },
    { id: 2, title: "Batman Man", ratings: 9 },
    { id: 3, title: "Super Man", ratings: 10 },
  ]);

  const handleUpdateClick = (index: number) => {
    setMovies((movies) =>
      movies.map((movie) =>
        index === movie.id ? { ...movie, title: "Title Updated" } : movie
      )
    );
  };

  return (
    <section>
      <h1>Movies List</h1>
      {movies.map((movie) => (
        <li onClick={() => handleUpdateClick(movie.id)} key={movie.id}>
          Title: {movie.title} | Ratings: {movie.ratings}
        </li>
      ))}

      <Link to={"/"}>Back to Home</Link>
    </section>
  );
};

export default LessonTwelve;
