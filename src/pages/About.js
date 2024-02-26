import { useEffect } from 'react';
import { APP_NAME } from '../globals/globalVariables';
import { imageFolderPath } from "../globals/globalVariables";

import '../styles/App.css';
import '../styles/About.css';


function About () {
    
    useEffect( () => {
        document.title = `${APP_NAME} - About`;
    }, [])

    return (
    <main className='about-container'>
        <h1>About CineDB</h1>
        <div className="content-container">
            <img src={`${imageFolderPath}about-image.png`} alt="About" />
            <div className="content-right">
                <p>At CineDB, we believe in the power of storytelling and the magic that unfolds on the silver screen. Our mission is to provide movie enthusiasts with a seamless and immersive experience as they explore the vast world of cinema. Whether you're a casual viewer or a dedicated cinephile, CineDB is your go-to destination for all things movies.</p>
                <p className='tmdb-info'>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                <img className="tmdb-logo" src={`${imageFolderPath}tmdb-logo.svg`} alt="TMDB Logo" />
            </div>
        </div>
    </main>
    )
}

export default About;