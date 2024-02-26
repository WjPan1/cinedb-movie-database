import { createContext, useEffect, useState } from "react";

// create the context
export const GlobalContext = createContext();

// creat the provider component 
export function GlobalProvider( {children} ) {
    // helper function to load from local storage
    function loadFromLocalStorage() {
        const localData = localStorage.getItem("watchlists");
        return localData ? JSON.parse(localData) : [];
     }


    //  initial state
    const [watchlists, setWatchlists] = useState(loadFromLocalStorage());

    // helper function to add a watchlist

    function addToWatchlists(watchlist) {
        const newWatchlists = [...watchlists, watchlist];
        setWatchlists(newWatchlists);
    }

    // helper function to remove a watchlist

    function removeFromWatchlists(watchlist) {
        const newWatchlists = watchlists.filter((fav) => {
            return fav.id !== watchlist.id;

        });
        setWatchlists(newWatchlists);
    }

    // use effect, that will run everytime something changes in the watchlists state

    useEffect(() => {
        // this code will rerun, everytime the state of watchlists changes
        localStorage.setItem("watchlists", JSON.stringify(watchlists));
    }, [watchlists]);

    return (
        <GlobalContext.Provider
            value = {{
                watchlists: watchlists,
                addToWatchlists: addToWatchlists,
                removeFromWatchlists: removeFromWatchlists,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

