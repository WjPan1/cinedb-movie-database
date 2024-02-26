import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { APP_NAME } from '../globals/globalVariables';
import { ReactComponent as MenuIcon } from '../images/menu-hamburger.svg';
import '../styles/Header.css';
import { imageFolderPath } from "../globals/globalVariables";

function Header() {

    const [isActive, setIsActive] = useState(false);

    // Show or Hide dropdown menu after clicked hamburger menu icon
    function handleClickMenu () {
        setIsActive(!isActive);
    };

    // Hide dropdown menu after clicked links
    function handleLinkClick () {
        setIsActive(false);
    };

    // Hide dropdown menu on Enter key pressed
    function handleSearchEnter () {
        setIsActive(false);
      };
    
    function handleSearchKeyDown (e) {
        if (e.key === 'Enter') {
            handleSearchEnter();
        }
    };

    return (
        <header>
            <div className="header-logo">
                <NavLink to="/">
                    <img src={`${imageFolderPath}cinedb-logo.png`} alt="Logo" />
                    <span className='website-name'>{APP_NAME}</span>
                </NavLink> 
                
            </div>

            <nav className= {`navbar-container ${isActive ? "actived" : ""}`}>
                <SearchBar  onEnterPressed={handleSearchEnter} 
                            onKeyDown={handleSearchKeyDown}/>
                <div className='header-menu'>
                    <NavLink to="/"  onClick={handleLinkClick}>Home</NavLink>
                    <NavLink to="/about"  onClick={handleLinkClick}>About</NavLink>
                    <NavLink to="/watchlist"  onClick={handleLinkClick}>Watchlist</NavLink>
                </div>
            </nav>
            
            <MenuIcon className="hamburger"
                      onClick={handleClickMenu}/>
        </header>
    );
}

export default Header;