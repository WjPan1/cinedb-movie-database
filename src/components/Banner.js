import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { getNowPlayingMovies } from '../utilities/api';
import { IMAGE_URL_BASE } from '../utilities/api';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/Banner.css";
import CircularBar from './CircularBar';


const Banner = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  // Track the current active slide's state
  const [activeSlide, setActiveSlide] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    getNowPlayingMovies().then((data) => {
        // Randomize the order of movies
        const randomizedMovies = data.results.sort(() => Math.floor(Math.random() * data.results.length) - Math.floor(Math.random() * data.results.length));
        
        // Select the first 5 movies
        const randomNowPlaying = randomizedMovies.slice(0, 5);
        setNowPlaying(randomNowPlaying);
        
    }).catch((error) => {
        console.error('Fetching now playing movies failed:', error);
    });
}, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    autoplaySpeed: 6000,
    // Update the index of the currently active slide
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="carousel-container">
        <Slider {...settings}>
            {nowPlaying.map((movieData, index) => (
                <div key={movieData.id} className={`carousel-item ${index === activeSlide ? 'active' : ''}`}>
                    <img src={`${IMAGE_URL_BASE}/w1280${movieData.backdrop_path}`} alt={movieData.title} className="carousel-image" />
                    <div className="carousel-intro">
                        <p className="movie-subtitle">
                            Now Playing 
                            <span className="vote-average">
                            <CircularBar voteAverage={movieData.vote_average.toFixed(1)} />
                            </span>
                        </p>
                        <h1 className="carousel-title">{movieData.title}</h1>
                        <p className="overview">{movieData.overview}</p>
                        <button 
                            onClick={() => navigate(`/movie/${movieData.id}`)} 
                            className="btn-more-info">
                            More Info
                        </button>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
  );
};

export default Banner;