// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import DateInput from '../components/DateInput';
import AmountInput from '../components/AmountInput';
import SubmitButton from '../components/SubmitButton';

// Constants import
import {
    INPUT_MEAL_VIEW,
    MAX_NB_MEAL,
    SUBMIT_INPUT_DATE_VIEW
} from '../const';

/**
 * InputDateView class is the first view which is displayed
 * when App state currentView is set as INPUT_DATE_VIEW.
 * This view is used to submit start date and end date which is
 * the period that the shopping list has to cover.
 * It also submit the amount of meal / day.
 */
class InputDateView extends Component {

    /**
     * Constructor of class InputDateView.
     * It check if startDate and endDate props are already set,
     * and instianciate dateStatus accordingly.
     * nbMeal state is also checked and instanciate too.
     */
    constructor(props) {
        super(props);
        const nbMeal = props.nbMeal;
        let startDate = "";
        let endDate = "";
        let dateStatus = [false, false];

        // Check if startDate state is Empty
        if (props.startDate !== "") {
            startDate = props.startDate;
            dateStatus = [true, dateStatus[1]];
        }

        // Check if endDate state is Empty
        if (props.endDate !== "") {
            endDate = props.endDate;
            dateStatus = [dateStatus[0], true];
        }

        this.state = {
            startDate: startDate, // Start date
            endDate: endDate,  // End date
            nbMeal: nbMeal,  // Number of meal / day
            dateStatus: dateStatus // Status of components DateInput
        }
    }

    /**
     * Set startDate state. Also check if the JSX element parameter
     * is empty or smaller than the current date and set dateStatus
     * accordingly.
     * 
     * @param {JSX} e : JSX element that call the method.
     * 
     * @return : none
     */
    onStartDateChange = (e) => {
        const { dateStatus } = this.state
        const date = e.target.value;

        if (date === "") {
            this.setState({
                startDate: date,
                dateStatus: [false, dateStatus[1]]
            });
        } else {
            this.setState({
                startDate: date,
                dateStatus: [!DateInput.checkDate(date), dateStatus[1]]
            });
        }
    }

    /**
     * Set endDate state. Also check if the JSX element parameter
     * is empty or smaller than the current date and set dateStatus
     * accordingly.
     * 
     * @param {JSX} e : JSX element that call the method.
     * 
     * @return : none
     */
    onEndDateChange = (e) => {
        const { dateStatus } = this.state
        const date = e.target.value;

        if (date === "") {
            this.setState({
                endDate: date,
                dateStatus: [dateStatus[0], false]
            });
        } else {
            this.setState({
                endDate: date,
                dateStatus: [dateStatus[0], !DateInput.checkDate(date)]
            });
        }
    }

    /**
     * Set nbMeal state. Also check if the JSX element parameter
     * has a smaller value than MAX_NB_MEAL constant and set it
     * accordingly.
     * 
     * @param {JSX} e : JSX element that call the method.
     * 
     * @return : none
     */
    onNbMealChange = (e) => {
        const number = e.target.value;

        if (number <= MAX_NB_MEAL) {
            this.setState({ nbMeal: number });
        }
    }

    /**
     * Submit states to the parent component by calling
     * parent's props methods.
     * Call setView props and put INPUT_MEAL_VIEW parameter
     * to shutdown the view and load the next one.
     * 
     * @param : none
     * 
     * @return : none
     */
    onSubmitState = () => {
        const { startDate, endDate, nbMeal } = this.state;
        const submit = this.canSubmit();

        if (submit) {
            const { mealList } = this.props;

            if (mealList.length > 0) {
                const currentNbMealNeeded = this.getCurrentNbMealNeeded();

                this.props.updateMealList(mealList.map((meal) => {
                    if (meal.amount > currentNbMealNeeded) {
                        return {
                            id: meal.id,
                            name: meal.name,
                            amount: currentNbMealNeeded
                        };
                    }
                    return meal;
                }));
            }
            this.props.handleStartDate(startDate);
            this.props.handleEndDate(endDate);
            this.props.handleNbMeal(nbMeal);
            this.props.setView(INPUT_MEAL_VIEW);
        }
    }

    /**
     * Compare startDate and endDate state, and check if the
     * endDate is bigger than the startDate.
     * Return the error value :
     *                  False = OK; True = ERROR.
     * 
     * @param : none
     * 
     * @return {boolean} : value of the error. Return true if 
     *                     startDate is smaller than endDate.
     */
    compareDates = () => {
        const { startDate, endDate } = this.state;

        if (!startDate || !endDate) {
            return false;
        }

        const start = new Date(startDate);
        const end = new Date(endDate)

        return start.getTime() > end.getTime() ? true : false;
    }

    /**
     * Calculate the number of meal needed by calculating the
     * difference between startDate and endDate states, times
     * the nbMeal state.
     * 
     * @param : none
     * 
     * @return {integer} : number of meal needed.
     */
    getCurrentNbMealNeeded = () => {
        const { nbMeal, startDate, endDate } = this.state;

        const start = new Date(startDate),
            end = new Date(endDate),
            difference = end.getTime() - start.getTime();

        const res = (((difference) / (1000 * 86400) + 1) * nbMeal);

        return res;
    }

    /**
     * Check if states can be submit to parent component or not.
     * It check dateStatus state values and call compareDates
     * method, and return true or false accordingly.
     * 
     * @param : none
     * 
     * @return {boolean} : boolean of if states can be submit to
     *                     parent component or not.
     */
    canSubmit = () => {
        const { dateStatus } = this.state;

        for (let i = 0; i < dateStatus.length; i++) {
            if (!dateStatus[i]) {
                return false;
            }
        }

        return !this.compareDates() ? true : false;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { startDate, endDate, nbMeal } = this.state;
        const error = this.compareDates();

        return (
            <div className="container-1">

                <DateInput
                    value={startDate}
                    externalError={error}
                    name="startDate"
                    onChange={this.onStartDateChange} >Date de début</DateInput>

                <DateInput
                    value={endDate}
                    externalError={error}
                    name="endDate"
                    onChange={this.onEndDateChange} >Date de fin</DateInput>

                <div className="div-amount-input">

                    <AmountInput
                        value={nbMeal}
                        maxValue={MAX_NB_MEAL}
                        onChange={this.onNbMealChange}
                    >Nombre de repas / jour</AmountInput>

                </div>

                <SubmitButton
                    onClick={this.onSubmitState}
                    canSubmit={this.canSubmit}
                    className={SUBMIT_INPUT_DATE_VIEW}
                >VALIDER</SubmitButton>

            </div>
        );
    }

}

InputDateView.propTypes = {
    nbMeal: PropTypes.number.isRequired,
    mealList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    updateMealList: PropTypes.func.isRequired,
    handleStartDate: PropTypes.func.isRequired,
    handleEndDate: PropTypes.func.isRequired,
    handleNbMeal: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
};

export default InputDateView;