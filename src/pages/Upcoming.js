import { useEffect, useState } from "react";
import { getUpComing } from "../utilities/api";
import { APP_NAME } from '../globals/globalVariables';
import MoviesContainer from "../components/MoviesContainer";


function Upcoming () {
    const [upComing, setUpComing] = useState([]);

    useEffect(() => {
        document.title = `${APP_NAME} - Upcoming`;

        getUpComing()
        .then((data) => {
            setUpComing(data.results);
        })
        .catch((error) => {
            alert(error);
        })
    },[])

    return (
        <section>
        <MoviesContainer moviesData={upComing} />
        </section>
    )
}

export default Upcoming;