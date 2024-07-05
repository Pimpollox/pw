// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Buscar productos..." 
        value={searchTerm} 
        onChange={onSearchChange} 
      />
      <button type="button">
        <Link to={`/resultados?q=${searchTerm}`}>Buscar</Link>
      </button>
    </div>
  );
}

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
  };
  

export default SearchBar;
