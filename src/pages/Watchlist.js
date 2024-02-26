import { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { APP_NAME } from '../globals/globalVariables';

import MovieCard from "../components/MovieCard";
import { imageFolderPath } from "../globals/globalVariables";

import '../styles/App.css';
import '../styles/MovieCards.css';


function Watchlist () {

    useEffect( () => {
        document.title = `${APP_NAME} - Watchlist`;
    }, [])

    const { watchlists } = useContext(GlobalContext);
    const [ watchlist, setWatchlist ] = useState([])

    // this code will rerun, everytime the state of watchlists changes
    useEffect(() => {
        if( watchlists === null ) {
            setWatchlist( [] );
        } else {
            setWatchlist(watchlists);
        }  

    }, [watchlists]);
  

    return (
    <main className="watchlist-container">
        <div className="watchlist-image"><img src={`${imageFolderPath}watchlist-photo.jpg`} alt="Watchlist Background" /></div>
        <div className="movies-container">
            <h1 className="watchlist-title">Watchlist</h1>

            <div className="movie-cards">

                { watchlist.length === 0 ? <p className="empty-watchlist">Your watchlist is empty. Add some movies to get started.</p> : 
                    watchlist.map ( (movieData) =>
                    <MovieCard key={movieData.id} movieData={movieData} />
                    )
                }

            </div>
        </div>
        
    </main>
    )
}

export default Watchlist;