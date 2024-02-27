import MovieCard from "./MovieCard";

import '../styles/MovieCards.css';

function MoviesContainer ( {moviesData} ) {
    return (
        <section className="movies-container">
            <div className="movie-cards">
                {moviesData.map((movieData) => 
                    ( movieData.backdrop_path !== null &&
                    movieData.poster_path !== null &&
                    movieData.poster_path !== null ) &&
                   <MovieCard key={movieData.id} movieData={movieData} />
                )}
            </div>
        </section>
    )
}

export default MoviesContainer;


