// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../../theme/LinePopUp.css';

// Constants import


/**
 * LinePopUp class is use to print one element from a
 * PopUp component.
 */
class LinePopUp extends Component {

    /**
     * Call toggleCheckedElementById props and put
     * it's id props as parameter to indicate to
     * its parent which LinePopUp component
     * has to be check.
     * 
     * @param : none
     * 
     * @return : none
     */
    toggleChecked = () => {
        const { id } = this.props;

        this.props.toggleCheckedElementById(id);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { checked, id, children } = this.props;

        return (
            <div className="element" onClick={() => this.toggleChecked()}>
                <input type="checkbox" onChange={() => this.toggleChecked()} checked={checked} id={id} name={children} />
                <label htmlFor={children}>{children}</label>
            </div>
        )
    }
}

LinePopUp.propTypes = {
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    toggleCheckedElementById: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
};

export default LinePopUp;