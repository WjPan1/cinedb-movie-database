import { useEffect, useState } from "react";
import { getPopularMovies } from "../utilities/api";
import { APP_NAME } from '../globals/globalVariables';
import MoviesContainer from "../components/MoviesContainer";


function Popular () {

    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        document.title = `${APP_NAME} - Popular`;

        getPopularMovies()
        .then((data) => {
            setPopularMovies(data.results);
        })
        .catch((error) => {
            alert(error);
        });
    },[]);

    return (
        <section>
            <MoviesContainer moviesData={popularMovies}/>
        </section>
    )
}

export default Popular;