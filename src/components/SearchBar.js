import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Magnifier } from "../images/magnifier.svg";

import '../styles/Header.css';


function SearchBar ( { onEnterPressed }) {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    
    function handleKeyDown (e) {
        if (e.key === "Enter" && input.trim() !== "" ) {
            // Prevent the default form submission behavior
            e.preventDefault();
    
            navigate(`/search/${input}`);
            setInput("");

        }       
    };

    return (
        <div className="search-container">

            <form onKeyDown={handleKeyDown}>
                <input
                    type="text"
                    className="text-box"
                    placeholder="Search..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    name="searchInput"
                    id="searchInput"
        
                />
            </form>

            <Magnifier className="search-icon"/>

        </div>
    )

}

export default SearchBar;