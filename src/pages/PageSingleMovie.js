import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APP_NAME } from '../globals/globalVariables';
import { getMovieById, getMovieCredits, getMovieImage } from "../utilities/api";
import { filterVideos, formatReleaseDate, convertRuntime } from "../utilities/toolbelt";
import { IMAGE_URL_BASE } from "../utilities/api";
import WatchlistButton from "../components/WatchlistButton";
import Slider from "react-slick";
import { imageFolderPath } from "../globals/globalVariables";
import CircularBar from "../components/CircularBar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/App.css';
import "../styles/PageSingleMovie.css";


function PageSingleMovie () {
    const params = useParams();
    const id = params.id;
    const [movieData, setMovieData] = useState();
    const [movieVideos, setMovieVideos] = useState([]);
    const [castData, setCastData] = useState([])
    const [movieImage, setMovieImage] = useState([]);

    useEffect(() => {

        // Get single movie info and video
        getMovieById(id)
        .then((data) => {
            // could clean up and filter the videos first, to throw away everything thats not a Youtube Trailer?
            const youtubeTrailerVideos = filterVideos(data.videos.results);
            setMovieData(data);
            setMovieVideos(youtubeTrailerVideos);
        }) 
        .catch((error) => {
            alert(error);
        });

        // Get Cast list
        getMovieCredits(id)
        .then((data) => {
            setCastData(data.cast);
        })
        .catch((error) => {
            alert(error);
        });

        // Get Backdrops
        getMovieImage(id)
        .then((data) => {
            // Only get the first 10 backdrops
            const firstTenBackdrops = data.images.backdrops.slice(0, 20); 
            const imagePathArray = firstTenBackdrops.map(imagePath => imagePath.file_path);
            setMovieImage(imagePathArray);
        })
        .catch((error) => {
            alert(error);
        })

    }, [id]);


    useEffect(() => {
        if (movieData) {
            document.title = `${APP_NAME} - ${movieData.title}`;
        }
    }, [movieData]);

    // handle cast scrollbar
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (event) => {
        const { scrollLeft } = event.target;
        if ( scrollLeft > 0 ) {
            setIsScrolled ( true );
        } else {
            setIsScrolled ( false );
        }
    };
    

    // Change the arrow svg in slider
    function SliderPrevArrow(props) {
        const { className, onClick } = props;
        return (
          <div
            className={className}
            style={{ display: "block" }}
            onClick={onClick}
          > <svg role="img" aria-label="Left Arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>

          </div>
        );
    }

    function SliderNextArrow(props) {
        const { className, onClick } = props;
        return (
          <div
            className={className}
            style={{ display: "block" }}
            onClick={onClick}
          >
            <svg role="img" aria-label="Right Arrow"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
          </div>
        );
    }

    // Slider setting
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,

        responsive: [
            {
                breakpoint: 1600,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                }
            },
            {
                breakpoint: 850,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            }
        ]
    };


    return (
        <main className="single-movie-container">
            {movieData && (
                <div className="movie-details">
                    {/* Movie info */}

                    <div key={movieData.id} className="intro-container">
                        <img src={`${IMAGE_URL_BASE}/w1280${movieData.backdrop_path}`} 
                            alt={movieData.title} 
                            className="backdrop-image" 
                        />
                        <img src={`${IMAGE_URL_BASE}/w342${movieData.poster_path}`} alt={movieData.title} className="post-image" />

                        <div className="intro-right">
                            <h1 className="movie-title">{movieData.title}</h1>
                            <div className="detail-container">
                                <span className="release-date">{formatReleaseDate(movieData.release_date)} 
                                </span>
                                <span className="vote-average">
                                    <CircularBar voteAverage={movieData.vote_average.toFixed(1)} />
                                </span>
                                <span className="runtime">{`${convertRuntime(movieData.runtime)}`}</span>
                                <span className="watchlist-botton"><WatchlistButton movieData={movieData} /></span>
                            </div>

                            <ul className="genre-list">
                                {movieData.genres.map( (genre) => 
                                    <li key={genre.id} className="genre">{genre.name}</li>
                                )}
                                
                            </ul>
                                
                            <p className="tagline">{movieData.tagline}</p>
                        </div>
                    </div>

                    <div className="overview-video-container">
                        {/* Overview */}
                        <div className="overview-container">
                            <h2>Overview</h2>
                            <p>{movieData.overview}</p>
                        </div>
                        
                                        
                        {/* Video */}
                        {movieVideos.length > 0 && (
                            <div className="movie-videos">
                                <img src={`${imageFolderPath}trailer.png`} alt="Trailer Icon" />
                                <h2>Trailor</h2>
                                <div className="trailor-container">

                                    <iframe
                                        width="100%"
                                        style={{ aspectRatio: '16/9' }}
                                        title={movieVideos[0].name}
                                        src={`https://www.youtube.com/embed/${movieVideos[0].key}`}
                                        allowFullScreen          
                                    >
                                    </iframe>
                                </div>
                            </div>  
                        )}
                    </div>  
                    
                    {/* Backdrops */}
                    {movieImage.length > 2 && (
                        <div className="backdrops-container">
                            <img src={`${imageFolderPath}photos.png`} alt="Backdrop Icon" />
                            <h2>Images</h2>
                            <Slider {...settings}>
                                {movieImage.map((image, index) => (
                                    <div key={index} className="slider">
                                        <img src={`${IMAGE_URL_BASE}/w780${image}`} alt="" 
                                            className="image-in-slider"/>
                                    </div>
                                ))}
                                
                            </Slider>
                        </div>
                    )}

                    {/* Cast Lists */} 
                    {(castData.length > 0 && castData.some((castItem) => castItem.profile_path !== null)) &&  (
                        <div className="cast-list">
                            <img src={`${imageFolderPath}top-cast.png`} alt="Top Cast Icon" />
                            <h2>Top Cast</h2>

                            <div className={`cast-scroll ${isScrolled ? 'scroll-left-gradient' : ''}`}>
                                <div onScroll={handleScroll} className="cast-card-container">
                                    { castData.map((castItem) => ( castItem.profile_path && 
                                        <div className="cast-card" key={castItem.cast_id}>
                                            <img src={`${IMAGE_URL_BASE}/w185${castItem.profile_path}`} alt={castItem.name} 
                                                className="cast-image"/>
                                            <p className="cast-name">{castItem.name}</p>
                                            <p className="cast-character">{castItem.character}</p>
                                            <p className="cast-popularity">❤️‍🔥 {castItem.popularity.toFixed(1)}</p>
                                        </div>
                                        
                                    ))}
                                </div>
                            </div>          
                        </div>
                    )}

                </div>
               
            )}
        </main>
    )
}

export default PageSingleMovie;
