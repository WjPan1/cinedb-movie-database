import { useEffect } from 'react';
import { APP_NAME } from '../globals/globalVariables';

import Banner from "../components/Banner";
import CategoryRouter from "../router/CategoryRouter";

import '../styles/Home.css';

function Home () {

    useEffect( () => {
        document.title = `${APP_NAME} - Home`;
        
    }, [])

    return (
        <main className="home-main-container">
            <Banner />
            <CategoryRouter />
        </main>
    )
}

export default Home;