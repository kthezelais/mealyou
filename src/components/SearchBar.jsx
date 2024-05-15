// Libraries import
import React from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/SearchBar.css';

// Constants import


/**
 * SearchBar component is used to filter a
 * list of elements to display from a keyword.
 */
const SearchBar = ({ onChange, removeKeyword, keyword }) => (
    <div className="div-search-bar">
        {keyword === "" ? <i className="fas fa-search"></i> : <i onClick={() => removeKeyword()} id="remove-keyword" className="fas fa-times"></i> }<input className="input-name-search-bar" placeholder="Rechercher..." type="text" onChange={(e) => onChange(e)} value={keyword} />
    </div>
)

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    removeKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
};

export default SearchBar;