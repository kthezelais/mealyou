// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/SubmitButton.css';

// Constants import


/**
 * SubmitButton class is use to display a button
 * which is clickable only if the canSubmit props
 * return true. Else, it will not be.
 */
class SubmitButton extends Component {
    
    /**
     * Print JSX from its states and props
     */
    render() {
        const { onClick, canSubmit, children, className } = this.props;
        const disabled = canSubmit();

        return <div className={"div-" + className}>
            <button onClick={() => onClick()} className={className} disabled={disabled ? "" : "none"}>{children}</button>
        </div>

    }
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    canSubmit: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default SubmitButton;