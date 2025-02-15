const MovieCard = ({movie}) => {

    const onFavoriteClick = ()=>{
        
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movie.url} alt="movie-title"/>
                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={onFavoriteClick}> 🤍 </button>
                </div>
            </div>
            <div className="movie-info"> 
                <h3>{movie.title}</h3> 
                <p>{movie.released_date}</p>
            </div>
        </div>
    )
}

export default MovieCard