import { useEffect, useState } from "react";
import { searchMovies } from "../utilities/api";
import { APP_NAME } from '../globals/globalVariables';
import { useParams } from "react-router-dom";
import MoviesContainer from "../components/MoviesContainer";

import '../styles/App.css';


function SearchResult () {
    const [ outputResult, setOutputResult ] = useState([]);
    const { query } = useParams();


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
    }, [query]);

    return (
        <main  className="main-container">
            <h1 className="search-heading">Search Results for: {query}</h1>
            <MoviesContainer  moviesData={outputResult} />
                    
        </main>
    )
}

export default SearchResult;