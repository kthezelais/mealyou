// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import Table from '../components/Table';
import SubmitAmountButton from '../components/SubmitAmountButton';
import BackButton from '../components/BackButton';

// Constants import
import {
    INPUT_DATE_VIEW,
    INPUT_OTHER_VIEW,
    INPUT_RECIPE_VIEW,
} from '../const';

/**
 * InputMealView class is the view which is called after InputDateView
 * view. It is displayed when App state currentView is set as
 * INPUT_MEAL_VIEW. This view is used to submit the list of meal which
 * will be used after to generate the shopping list.
 */
class InputMealView extends Component {

    /**
     * Calculate the number of meal already input by calculating
     * the sum of each elements in the meal list, times their amount.
     * 
     * @param : none
     * 
     * @return {integer} : number of meal already input.
     */
    getNbMealInput = () => {
        const { mealList } = this.props;
        let nbMealInput = 0;

        for (let i = 0; i < mealList.length; i++) {
            nbMealInput += mealList[i].amount;
        }

        return nbMealInput;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { mealList, recipeList, recipesSelectedList, canImport } = this.props;
        const nbMealNeeded = this.props.getNbMealNeeded(); // Total meal number required
        const nbMealInput = this.getNbMealInput(); // Current meal number input

        return (
            <React.Fragment>

                <Table
                    elementList={mealList} // Meals as elementList
                    popUpElementList={recipeList} // Recipes as popUpElementList 
                    selectedPopUpElementList={recipesSelectedList} // Recipes already selected as popUpElementSelectedList
                    maxElementAmount={nbMealNeeded}
                    canImport={canImport}
                    updateElementList={this.props.setMealList}
                    updateSelectedPopUpElementList={this.props.setRecipesSelectedList}
                    inLoadRef={this.props.inLoadRef}
                    importDatas={this.props.importDatas}
                    setView={this.props.setView}
                    setViewImport={this.props.setView}
                    nextView={INPUT_RECIPE_VIEW}
                >Liste des repas</Table>

                <SubmitAmountButton
                    amountInput={nbMealInput}
                    amountNeeded={nbMealNeeded}
                    onClick={this.props.setView}
                    nextView={INPUT_OTHER_VIEW}
                />

                <BackButton
                    onClick={this.props.setView}
                    previousView={INPUT_DATE_VIEW}
                />

            </React.Fragment>
        );
    }
}

InputMealView.propTypes = {
    recipeList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            ingredients: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    amount: PropTypes.number.isRequired
                }).isRequired
            ).isRequired
        }).isRequired
    ).isRequired,
    mealList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    recipesSelectedList: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    canImport: PropTypes.bool.isRequired,
    getNbMealNeeded: PropTypes.func.isRequired,
    setRecipesSelectedList: PropTypes.func.isRequired,
    setMealList: PropTypes.func.isRequired,
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    importDatas: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
};

export default InputMealView;