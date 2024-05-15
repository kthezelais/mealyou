// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/DateInput.css';

// Constants import


/**
 * DateInput class is a component use to manage
 * an input date by controlling the <input> :
 *  1. Date must be bigger than the current date.
 *  2. External Error must be false all the time
 *     (comparison between two DateInput value)
 */
class DateInput extends Component {

    /**
     * Check if the date input is bigger than the current date.
     * Return the error value :
     *                  False = OK; True = ERROR.
     * 
     * @param {string} date : date in string format.
     * 
     * @return {boolean} : value of the error. Return true if the
     *                     currentDate is bigger than the inputDate.
     */
    static checkDate(date) {
        let inputDate = new Date(date);
        let currentDateTime = new Date(Date.now());
        let currentDate = new Date(currentDateTime.getFullYear()
            + "-" + (currentDateTime.getMonth() + 1)
            + "-" + currentDateTime.getDate());

        if (inputDate.getTime() < currentDate.getTime()) {
            return true;
        }
        return false;
    }

    /**
     * Return the error message to display from the errors values.
     * 
     * @param {boolean} error : the error return by the checkDate
     *                          method.
     * @param {boolean} externalError : the error get from props
     *                          (comparison between two dates).
     * 
     * @return {string} : the error message to display.
     */
    errorMsg(error, externalError) {
        if (error) {
            return "La date doit être supérieur ou égale à la date du jour.";
        } else if (externalError) {
            return "La date de début doit être inférieur à la date de fin.";
        }
        return null;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { value, name, externalError, onChange, children } = this.props;
        const error = DateInput.checkDate(value);
        const rangeError = !externalError || externalError === undefined ? false : true;

        return <div className={!error && !rangeError ? "div-date-input" : "div-date-input-error"}>
            <label htmlFor={name} className="label-date-input">{children}</label>
            <input type="date" value={value} onChange={onChange} className={!error && !rangeError ? "date-input" : "date-input-error"} name={name} />
            <span className="error-msg">{this.errorMsg(error, rangeError)}</span>
        </div>
    }
}

DateInput.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    externalError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
};

export default DateInput;