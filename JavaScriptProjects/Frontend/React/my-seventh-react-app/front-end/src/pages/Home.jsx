import { useState } from "react"
import MovieCard from "../components/MovieCard"


const Home = () => {

    const movies = [{
        id: 1,
        title: "pk",
        url: "http://localhost:3000",
        release_date: "1998",
    },
    {
        id: 2,
        title: "3idiots",
        url: "http://localhost:3000",
        release_date: "2015",
    },
    {
        id: 3,
        title: "The Matrix",
        url: "http://localhost:3000",
        release_date: "2015",
    },
    {
        id: 4,
        title: "Terminator",
        url: "http://localhost:3000",
        release_date: "2015",
    },
    ]

    return (
        <div>
           {movies.map((movie)=> <MovieCard movie={movie}/>)}
        </div>
    )

}

export default Home 