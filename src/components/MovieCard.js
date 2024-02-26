import { useNavigate } from "react-router-dom";
import { IMAGE_URL_BASE } from "../utilities/api";
import WatchlistButton from "./WatchlistButton";
import { formatReleaseDate } from "../utilities/toolbelt";
import CircularBar from "./CircularBar";

import '../styles/MovieCards.css';

const defaultMovieData = {
    adult: false,
    backdrop_path: "/criPrxkTggCra1jch49jsiSeXo1.jpg",
    genre_ids: [
      878,
      12,
      28
    ],
    id: 609681,
    original_language: "en",
    original_title: "The Marvels",
    overview: 
        "Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with that of Jersey City super-fan Kamala Khan, aka Ms. Marvel, and Carol's estranged niece, now S.A.B.E.R. astronaut Captain Monica Rambeau. Together, this unlikely trio must team up and learn to work in concert to save the universe.",
    popularity: 3327.208,
    poster_path: "/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
    release_date: "2023-11-08",
    title: "The Marvels",
    video: false,
    vote_average: 6.366,
    vote_count: 1140
  }

function MovieCard ({movieData = defaultMovieData}) {
    const imagePath = `${IMAGE_URL_BASE}/w500${movieData.poster_path}`;
    const navigate = useNavigate();
    
    return (
        <section className="movie-card">
            <p className="vote-average">
                <CircularBar voteAverage={movieData.vote_average.toFixed(1)} />
            </p>
            <img src={imagePath} alt={movieData.title} className="movie-card-image" />

            <div className="hover-container">
                <h3>{movieData.title}</h3>
                <p className="release-date">
                    {formatReleaseDate(movieData.release_date)}
                </p>
                <WatchlistButton movieData={movieData} className="watchlist-in-card" />

                <button 
                    onClick={() => navigate(`/movie/${movieData.id}`)} 
                    className="btn-more-info">
                    More Info
                </button>
            </div>

            
        </section>
    )
}

export default MovieCard;