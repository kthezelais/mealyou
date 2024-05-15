// Libraries import
import React from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/BackButton.css';

// Constants import


/**
 * BackButton component allows to go back
 * into previous view.
 * 
 * @param {Function} onClick : call the parent method used
 *                             to go back into previous view.
 * 
 * @param {integer} previousView : id of the previous view.  
 */
const BackButton = ({ onClick, previousView }) => (
    <div>
        <button onClick={() => onClick(previousView)} className="back-button" alt="back-button"><i className="fas fa-arrow-left"></i></button>
    </div>
)

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    previousView: PropTypes.number.isRequired
};

export default BackButton;