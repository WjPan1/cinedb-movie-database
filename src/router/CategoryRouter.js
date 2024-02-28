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
    const [lastTabIndex, setLastTabIndex] = useState(null);

    const handleCategoryOpacity = (index) => {
        if ( index !== lastTabIndex ) {

            setContainerOpacity(true);
            
            setTimeout(() => {
                setContainerOpacity(false);
            }, 10);

            setLastTabIndex(index);
        }
    };
    

    return (
        <Tabs className="movie-category-container">
            <TabList className="movie-list">
                <Tab  index={0} className="movie-link" onClick={ () => handleCategoryOpacity(0) }>
                    <img src={`${imageFolderPath}popular.png`} alt="Popular Icon" />
                    <span className="text">Popular</span>
                </Tab>
                <Tab  index={1} className="movie-link" onClick={ () => handleCategoryOpacity(1) }>
                    <img src={`${imageFolderPath}top-rated.png`} alt="Top Rated Icon" /> 
                    <span className="text">Top Rated</span>
                </Tab>

                <Tab  index={2} className="movie-link" onClick={ () => handleCategoryOpacity(2) }>
                    <img src={`${imageFolderPath}upcoming.png`} alt="Upcoming Icon" /> 
                    <span className="text">Upcoming</span>
                </Tab>

                <Tab  index={3} className="movie-link" onClick={ () => handleCategoryOpacity(3) }>
                    <img src={`${imageFolderPath}now-playing.png`} alt="Now Playing Icon" /> 
                    <span className="text">Now Playing</span>
                </Tab>
            </TabList>

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

            </div>
        </Tabs>
    )
}

export default CategoryRouter;