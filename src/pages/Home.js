import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { APP_NAME } from '../globals/globalVariables';

import Banner from "../components/Banner";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Upcoming from "./Upcoming";
import NowPlaying from "./NowPlaying";

import { imageFolderPath } from "../globals/globalVariables";

import '../styles/Home.css';

function Home () {

    useEffect( () => {
        document.title = `${APP_NAME} - Home`;
    }, [])

    return (
    <main className="home-main-container">
        <Banner />

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
            <Route index element={<Popular />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/now-playing" element={<NowPlaying />} />

         </Routes>
    </main>
    )
}

export default Home;