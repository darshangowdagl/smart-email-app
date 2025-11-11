import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import React from 'react';

function SearchBar({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="inbox-title">INBOX</h1>
        </div>
        
        <div className="search-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Neuromail" 
              className="search-input"
              onChange={handleInputChange} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;