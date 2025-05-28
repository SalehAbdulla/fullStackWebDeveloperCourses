import "./HandleUpdateComponent.css";
import { useState, useRef } from "react";

type movieProp = {
  id: number;
  title: string;
  ratings: number;
};

const HandleUpdateComponent = () => {
const lastIdRef = useRef(3);
  const movies = [
    { id: 1, title: "Spider Man", ratings: 3 },
    { id: 2, title: "Super Man", ratings: 6 },
  ];

  const [allMovies, setAllMovies] = useState<movieProp[]>(movies);
  const [movieTitle, setMovieTitleInput] = useState("");
  const [movieRating, setMovieRating] = useState<number>(0);
  const [editMovieIndex, setEditMovieIndex] = useState<number | null>(null);

  const startEditing = (movie: movieProp, index: number) => {
    setMovieTitleInput(movie.title);
    setMovieRating(movie.ratings);
    setEditMovieIndex(index);
  };

  const handleMovieTitleInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMovieTitleInput(event.currentTarget.value);
  };

  const handleMovieRatingInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMovieRating(Number(event.currentTarget.value));
  };

  const deleteMovie = (index: number) => {
    setAllMovies((allMovies) => allMovies.filter((_, i) => i !== index));
  };

  const handleAddMovie = (movieTitle: string, movieRating: number) => {
    if (movieTitle.trim() === "" || movieRating < 1 || movieRating > 10) return;

    if (editMovieIndex !== null) {
      setAllMovies((preValue) =>
        preValue.map((movie, i) =>
          i === editMovieIndex
            ? { ...movie, title: movieTitle, ratings: movieRating }
            : movie
        )
      );
    } else {
      setAllMovies((allMovies) => [
        ...allMovies,
        { id: lastIdRef.current++, title: movieTitle, ratings: movieRating },
      ]);
    }

    setMovieTitleInput("");
    setMovieRating(0);
    setEditMovieIndex(null);
  };

  return (
    <div className="flex-div">
      {allMovies.map((movie, i) => (
        <>
          <h1 key={i}>
            {movie.title} | Ratings: {movie.ratings}{" "}
            <button onClick={() => deleteMovie(i)} key={i}>
              Delete
            </button>
            <button onClick={() => startEditing(movie, i)} key={i}>
              Update
            </button>
          </h1>
        </>
      ))}

      <div>
        <input
          onChange={handleMovieTitleInput}
          placeholder="Title"
          autoFocus
          value={movieTitle}
        />
        {"   "}

        <input
          onChange={handleMovieRatingInput}
          placeholder="Rating"
          autoFocus
          value={movieRating}
        />
        <button onClick={() => handleAddMovie(movieTitle, movieRating)}>
          Add
        </button>

      </div>
    </div>
  );
};

export default HandleUpdateComponent;
