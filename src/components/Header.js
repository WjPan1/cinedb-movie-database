import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { ReactComponent as MenuIcon } from '../images/menu-hamburger.svg';
import { APP_NAME } from '../globals/globalVariables';
import { imageFolderPath } from "../globals/globalVariables";

import '../styles/Header.css';

function Header() {

    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef(null);


    useEffect(() => {
        // Determine if the screen is at the top
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Determine if the screen is scrolled
            setIsScrolled(scrollPosition > 0); 
        };

        window.addEventListener('scroll', handleScroll);


        // Determine if clicked the area outside of the nav-container
        const handleClickOutsideNavbar = (event) => {
            if ( navbarRef.current && !navbarRef.current.contains(event.target) ) {
                setIsActive(false);
            } else {
                setIsActive( true )
            }
        }

        document.addEventListener('click', handleClickOutsideNavbar)

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutsideNavbar)
        };

    }, []);

    // Show or Hide dropdown menu after clicked hamburger menu icon
    function handleDropDownMenu (event) {
        event.stopPropagation(); 

        setIsActive(!isActive);
    };

    // Hide dropdown menu after clicked links
    function hideDropdownMenuOnNavLinkClicked (event) {
        event.stopPropagation(); 

        setIsActive(false);
    };
    

    return (
        <header className={`isScroll ${ isScrolled ? "scrolled" : "" }`}>
            <div className="header-logo">
                <NavLink to="/" className="logo-container"><img src={`${imageFolderPath}cinedb-logo.png`} alt="Logo" /><span className='website-name'>{APP_NAME}</span></NavLink> 
                
            </div>

            <div className="searchbar-menu-container">
                <SearchBar />

                <nav ref={navbarRef} className= "navbar-container">
                    <div className={`header-menu ${isActive ? "actived" : ""}`} >
                        <NavLink to="/" onClick={ hideDropdownMenuOnNavLinkClicked }>Home</NavLink>
                        <NavLink to="/about" onClick={ hideDropdownMenuOnNavLinkClicked }>About</NavLink>
                        <NavLink to="/watchlist" onClick={ hideDropdownMenuOnNavLinkClicked }>Watchlist</NavLink>
                    </div>
                </nav>
            </div>
            
            <MenuIcon className={`hamburger ${isActive ? "actived" : ""}`}
                      onClick={handleDropDownMenu}/>


        </header>
    );
}

export default Header;