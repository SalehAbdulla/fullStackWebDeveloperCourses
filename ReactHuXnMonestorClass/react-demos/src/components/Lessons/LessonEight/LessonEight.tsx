import "./LessonEight.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LessonEight = () => {
  const [friends, setFriends] = useState(["SALEH", "WORK", "MONEY", "ME"]);
  const [friend, setFriend] = useState("");
  const handleOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFriend(event.currentTarget.value);
  };

  const addFriend = (input: string) => {
    setFriends((friends) => [...friends, input]);
    setFriend("");
  };

  const removeFriend = (index: number) => {
    setFriends((friends) => friends.filter((_, i) => index != i));
  };

  const handleOnKeyDown = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>
  ) => {
    if (event.key === "Enter") {
      addFriend(friend);
    }
  };

  const moviesObject = [
    { id: 1, title: "Spider Man", ratings: 3 },
    { id: 2, title: "Super Man", ratings: 6 },
    { id: 3, title: "Batman Man", ratings: 9 },
    { id: 4, title: "Saleh Man", ratings: 10 },
  ];

  type moviesProp = {
    id: number;
    title: string;
    ratings: number;
  };

  const [movies, setMovies] = useState<moviesProp[]>(moviesObject);

  const handleChangeMovieTitle = (index: number, title: string) => {
    setMovies((movies) =>
      movies.map((movie, i) => (i === index ? { ...movie, title } : movie))
    );
  };
  const [changeMovieTitleInput, setChangeMovieTitleInput] = useState<{
    [key: number]: string;
  }>({});

  const handleMovieOnChange = (id: number, value: string) => {
    setChangeMovieTitleInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  return (
    <>
      <section className="wrapper">
        <div>
          <ol>
            {friends.map((element, index) => (
              <div className="inner-input-btn">
                <li key={index}>
                  {element}
                  <button
                    id="inner-btn"
                    style={{ marginLeft: "100px" }}
                    onClick={() => removeFriend(index)}
                  >
                    remove
                  </button>
                </li>
              </div>
            ))}
          </ol>

          <div className="input-btn">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addFriend(friend);
              }}
            >
              <input
                required
                autoFocus
                onKeyDown={handleOnKeyDown}
                onChange={handleOneChange}
                value={friend}
              />
              <button
                type="submit"
                id="inner-input-btn"
                onClick={() => {
                  if (friend.trim() === "") {
                    alert("Must enter a value");
                    return;
                  }
                  addFriend(friend);
                }}
              >
                Add
              </button>
            </form>
          </div>
        </div>

        <hr />

        <div className="wrapper">
          <ul>
            {movies.map((movie, index) => (
              <li key={movie.id}>
                {movie.title} - {movie.ratings}{" "}
                <input
                  value={changeMovieTitleInput[movie.id] ?? ""}
                  onChange={(e) =>
                    handleMovieOnChange(movie.id, e.target.value)
                  }
                />{" "}
                <button
                  className="movie-btn"
                  onClick={() =>
                    handleChangeMovieTitle(
                      index,
                      changeMovieTitleInput[movie.id] ?? ""
                    )
                  }
                >
                  Change Movie Name
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Link to={"/handleupdatecomponent"}>handleupdatecomponent</Link>

        
      </section>
    </>
  );
};

export default LessonEight;
