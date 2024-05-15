// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types'

// Components import


// Styles import
import '../theme/AmountInput.css';

// Constants import


/**
 * AmountInput class is use to manage a <select>
 * HTML component dynamically.
 * It generate a number of option equals to the
 * maxValue props.
 */
class AmountInput extends Component {

    /**
     * Print JSX from its states and props
     */
    render() {
        const { value, maxValue, onChange, children } = this.props;
        let amount = new Array(maxValue); // Initialize amount array with a length of maxValue (props).
        amount.fill(0, 0, amount.length); // Instanciate amount array with 0 number.

        return (
            <React.Fragment>
                {/* Add a label to <select> HTML component if children props exist. */}
                {children !== undefined &&
                    <label htmlFor="amount-input">{children}</label>
                }

                {/**
                 * Generate <select> HTML component with an <option> number equals to
                 * maxValue props. Current <option> component add 1 to its value
                 * from the value of the previous one.
                 */}
                <select value={value} onChange={onChange} name="amount-input">
                    {amount.map((element, index) => {
                        return <option key={index} value={index + 1}>{index + 1}</option>
                    })}
                </select>
            </React.Fragment>
        )
    }
}

AmountInput.propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string
};

export default AmountInput;