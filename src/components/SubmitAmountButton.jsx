// Libraries import
import React from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/SubmitAmountButton.css';

// Constants import


/**
 * SubmitAmountButton component check from its props if
 * the amount inputed is equal to the amount needed.
 * The button will not be clickable until the condition
 * is not met.
 */
const SubmitAmountButton = ({ amountInput, amountNeeded, onClick, nextView }) => (
    <div className="div-submit-meal-button">
        <button onClick={() => onClick(nextView)} className="submit-meal-button" disabled={amountInput !== amountNeeded ? "none" : ""}>
            {amountInput === amountNeeded && "VALIDER"}
            {amountInput !== amountNeeded && amountInput + " / " + amountNeeded}
        </button>
    </div>
)

SubmitAmountButton.propTypes = {
    amountInput: PropTypes.number.isRequired,
    amountNeeded: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    nextView: PropTypes.number.isRequired
};

export default SubmitAmountButton;