import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { ReactComponent as WatchlistIcon } from "../images/watchlist-button.svg";

import "../styles/WatchlistButton.css";

function WatchlistButton ( { movieData, className } ) {

    const { watchlists, addToWatchlists, removeFromWatchlists } = useContext(GlobalContext);
    
    const inWatchlist = watchlists.find( (list) => {
        // console.log( movieData.id)
        return list.id === movieData.id;
    });

    function handleWatchlist ( event ) {
        // Don't let any parent elements run their click handlers
        event.stopPropagation();
        if ( inWatchlist ) {
            removeFromWatchlists( movieData );

        } else {
            // not currently in watchlist
            addToWatchlists( movieData );
        }
    }
    
    return (
        <WatchlistIcon 
            onClick={handleWatchlist}
            className={`watchlist ${ inWatchlist ? "inWatchlist" : ""} ${className}`}
        />

    )
}

export default WatchlistButton;