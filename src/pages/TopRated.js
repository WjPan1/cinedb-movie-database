import { useEffect, useState } from "react";
import { getTopRated } from "../utilities/api";
import { APP_NAME } from '../globals/globalVariables';
import MoviesContainer from "../components/MoviesContainer";


function TopRated () {
    const [topRated, setTopRated] =useState([]);

    useEffect(() => {
        document.title = `${APP_NAME} - Top Rated`;

        getTopRated()
        .then((data) => {
            setTopRated(data.results);
        })
        .catch((error) => {
            alert(error);
        });
    },[]);

    return (
        <section>
            <MoviesContainer moviesData={topRated}/>
        </section>
    )
}

export default TopRated;