import { imageFolderPath } from "../globals/globalVariables";
import { NavLink } from 'react-router-dom';
import { APP_NAME } from '../globals/globalVariables';


import '../styles/Footer.css';

function Footer () {
    return (
    <footer>
        <div className="footer-logo">
            <NavLink to="/">
                <img src={`${imageFolderPath}cinedb-logo.png`} alt="Logo" />
                <span className='website-name'>{APP_NAME}</span>
            </NavLink> 
        </div>
        <p>&copy; 2024. All rights reserved.</p>
    </footer>
    )
}

export default Footer;