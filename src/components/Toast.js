//########################################################################################################
//######################### DEPRECATED COMPONENT : USE TOAST OF IONIC NPM PACKET #########################
//########################################################################################################

// Libraries import
import React from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/Toast.css';

// Constants import


/**
 * Toast component is used to display a message.
 * It adapts the component style and event from
 * its props.
 */
const Toast = ({ onClick, className, children }) => (
    <div className={className} >
        <p>
            <button onClick={() => onClick(false)} >
                <i className="far fa-times-circle"></i>
            </button>
        </p>
        <p>{children}</p>
    </div>
)

Toast.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default Toast;