import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { imageFolderPath } from "../globals/globalVariables";
import { getNowPlayingMovies, getPopularMovies, getTopRated, getUpComing } from "../utilities/api";
import MoviesContainer from "../components/MoviesContainer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";


function CategoryRouter () {

    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] =useState([]);
    const [upComing, setUpComing] = useState([]);
    const location = useLocation();


    useEffect(() => {
        fetchAllMovies();
    }, []);

    const fetchAllMovies = () => {
        Promise.all([
            getPopularMovies(),
            getNowPlayingMovies(),
            getTopRated(),
            getUpComing()
        ]).then(([popularData, nowPlayingData, topRatedData, upComingData]) => {
            setPopularMovies(popularData.results);
            setNowPlaying(nowPlayingData.results);
            setTopRated(topRatedData.results);
            setUpComing(upComingData.results);
        }).catch(error => {
            alert('Fetching movies failed');
        });
    }

    const [containerOpacity, setContainerOpacity] = useState(false);

    const handleCategoryOpacity = () => {
        setContainerOpacity(true);

        setTimeout(() => {
            setContainerOpacity(false);
        }, 10);
    };
    

    return (
        <Tabs className="movie-category-container">
            {/* <div className="movie-list-container"> */}
                <TabList className="movie-list">
                    {/* <li className="movie-link"> */}
                        <Tab className="movie-link" onClick={ handleCategoryOpacity }>
                            <img src={`${imageFolderPath}popular.png`} alt="Popular Icon" />
                            <span className="text">Popular</span>
                        </Tab>
                    {/* </li> */}
                    {/* <li className="movie-link"> */}
                        <Tab className="movie-link" onClick={ handleCategoryOpacity }>
                            <img src={`${imageFolderPath}top-rated.png`} alt="Top Rated Icon" /> 
                            <span className="text">Top Rated</span>
                        </Tab>
                    {/* </li> */}
                    {/* <li className="movie-link"> */}
                        <Tab className="movie-link" onClick={ handleCategoryOpacity }>
                            <img src={`${imageFolderPath}upcoming.png`} alt="Upcoming Icon" /> 
                            <span className="text">Upcoming</span>
                        </Tab>
                    {/* </li> */}
                    {/* <li > */}
                        <Tab className="movie-link" onClick={ handleCategoryOpacity }>
                            <img src={`${imageFolderPath}now-playing.png`} alt="Now Playing Icon" /> 
                            <span className="text">Now Playing</span>
                        </Tab>
                    {/* </li> */}
                </TabList>
            {/* </div> */}

            <div className={`container ${containerOpacity ? "opacity" : "no-opacity" }`}>

                <TabPanel>
                    <MoviesContainer moviesData={popularMovies} />
                </TabPanel>
                <TabPanel>
                    <MoviesContainer moviesData={topRated}/>
                </TabPanel>
                    <TabPanel>
                    <MoviesContainer moviesData={upComing} />
                </TabPanel>
                <TabPanel>
                    <MoviesContainer moviesData={nowPlaying} />
                </TabPanel>

            {/* <Routes>
                <Route index element={<MoviesContainer moviesData={popularMovies} />} />
                <Route path="/popular" element={<MoviesContainer moviesData={popularMovies} />} />
                <Route path="/top-rated" element={<MoviesContainer moviesData={topRated}/>} />
                <Route path="/upcoming" element={<MoviesContainer moviesData={upComing} />} />
                <Route path="/now-playing" element={<MoviesContainer moviesData={nowPlaying} />} />

            </Routes> */}
            </div>
        </Tabs>
    )
}

export default CategoryRouter;