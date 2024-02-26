import { imageFolderPath } from "../globals/globalVariables";
import { NavLink } from 'react-router-dom';

import '../styles/Footer.css';

function Footer () {
    return (
    <footer>
        <div className="footer-logo">
            <NavLink to="/"><img src={`${imageFolderPath}cinedb-logo.png`} alt="Logo" /></NavLink> 
            <span>CinDB</span>
        </div>
        <p>&copy; 2024. All rights reserved.</p>
    </footer>
    )
}

export default Footer;