import { useEffect, useState } from "react";
import { searchMovies } from "../utilities/api";
import { APP_NAME } from '../globals/globalVariables';
import { useParams } from "react-router-dom";
import MoviesContainer from "../components/MoviesContainer";

import '../styles/App.css';


function SearchResult () {
    const [ outputResult, setOutputResult ] = useState([]);
    const { query } = useParams();
    const [containerOpacity, setContainerOpacity] = useState(true);


    useEffect(() => {
      document.title = `${APP_NAME} - Search Result: ${query}`;

        if (query) {
             searchMovies(query)
            .then((data) => {
                setOutputResult(data.results)           
            })
            .catch((error) => {
            alert(error);
            });
        }

        setContainerOpacity(true);

        setTimeout(() => {
            setContainerOpacity(false);
        }, 1000);

    }, [query]);



    return (
        <main  className="main-container">
            <h1 className="search-heading">Search Results for: {query}</h1>

            <div className={`search-result ${containerOpacity ? 'opacity' : 'no-opacity'}`}>

            {outputResult.length === 0 ? <p className="no-movie-found"><span className="cry-emoji">😭</span>No movies found.</p> : 
                <MoviesContainer  moviesData={outputResult} />
            }
            </div>
        </main>
    )
}

export default SearchResult;