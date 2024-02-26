import { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../utilities/api";
import { APP_NAME } from '../globals/globalVariables';
import MoviesContainer from "../components/MoviesContainer";

function NowPlaying () {

    const [nowPlaying, setNowPlaying] = useState([]);

    useEffect(() => {
        document.title = `${APP_NAME} - Now Playing`;

        getNowPlayingMovies()
        .then((data) => {
            setNowPlaying(data.results);
        })
        .catch((error) => {
            alert(error);
        });
    },[]);

    return (
        <section>
        <MoviesContainer moviesData={nowPlaying} />
        </section>
    )
}

export default NowPlaying;