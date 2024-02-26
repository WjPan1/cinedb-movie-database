import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { imageFolderPath } from "../globals/globalVariables";
import { getNowPlayingMovies, getPopularMovies, getTopRated, getUpComing } from "../utilities/api";
import MoviesContainer from "../components/MoviesContainer";


function CategoryRouter () {

    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] =useState([]);
    const [upComing, setUpComing] = useState([]);


    const fetchPopular = () => {
        getPopularMovies()
        .then((data) => {
            setPopularMovies(data.results);
        })
        .catch((error) => {
            alert(error);
        });
    }

    const fetchNowPlaying = () => {
        getNowPlayingMovies()
        .then((data) => {
            setNowPlaying(data.results);
        })
        .catch((error) => {
            alert(error);
        });
    }

    const fetchTopRated = () => {
        getTopRated()
        .then((data) => {
            setTopRated(data.results);
        })
        .catch((error) => {
            alert(error);
        });
    }

    const fetchUpcoming = () => {
        getUpComing()
        .then((data) => {
            setUpComing(data.results);
        })
        .catch((error) => {
            alert(error);
        })
    }
    
    useEffect(() => {
        fetchPopular();
        fetchNowPlaying();
        fetchTopRated();
        fetchUpcoming();
    },[]);

    return (
        <div className="movie-category-container">
            <div className="movie-list-container">
                <ul className="movie-list">
                    <li className="movie-link">
                        <NavLink to="/popular" >
                            <img src={`${imageFolderPath}popular.png`} alt="Popular Icon" />
                            <span className="text">Popular</span>
                        </NavLink>
                    </li>
                    <li className="movie-link">
                        <NavLink to="/top-rated" >
                            <img src={`${imageFolderPath}top-rated.png`} alt="Top Rated Icon" /> 
                            <span className="text">Top Rated</span>
                        </NavLink>
                    </li>
                    <li className="movie-link">
                        <NavLink to="/upcoming" >
                            <img src={`${imageFolderPath}upcoming.png`} alt="Upcoming Icon" /> 
                            <span className="text">Upcoming</span>
                        </NavLink>
                    </li>
                    <li className="movie-link">
                        <NavLink to="/now-playing" >
                            <img src={`${imageFolderPath}now-playing.png`} alt="Now Playing Icon" /> 
                            <span className="text">Now Playing</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <Routes>
            <Route index element={<MoviesContainer moviesData={popularMovies} />} />
            <Route path="/popular" element={<MoviesContainer moviesData={popularMovies} />} />
            <Route path="/top-rated" element={<MoviesContainer moviesData={topRated}/>} />
            <Route path="/upcoming" element={<MoviesContainer moviesData={upComing} />} />
            <Route path="/now-playing" element={<MoviesContainer moviesData={nowPlaying} />} />

            </Routes>
        </div>
    )
}

export default CategoryRouter;