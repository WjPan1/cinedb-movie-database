import { useEffect, useState } from 'react';
import { APP_NAME } from '../globals/globalVariables';

import Banner from "../components/Banner";
import CategoryRouter from "../router/CategoryRouter";
import spinner from "../images/spinner.gif";

import '../styles/Home.css';

function Home () {

    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        document.title = `${APP_NAME} - Home`;

        setTimeout(() => {
            setIsLoading(false);
        }, 500);

    }, [])
    

    return (
    <main className="home-main-container">
            <img className={`spinner ${isLoading ? 'loading' : 'loaded'}`} src={spinner} alt="Spinner" />
            <div className={`loading ${isLoading ? 'not-finish' : 'finished'}`}>
                <Banner />
                <CategoryRouter />
            </div>
    </main>
    )
}

export default Home;