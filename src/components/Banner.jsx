// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Image import
import MealYou from '../images/mealyou-title-icon.png';

// Styles import
import '../theme/Banner.css';

// Constants import
import {
    INPUT_DATE_VIEW,
    INPUT_MEAL_VIEW
} from '../const';

/**
 * Banner component display an <header> HTML
 * Component on the top of the page.
 * It is displayed on each views.
 * It also display a loading spinner when a
 * JSON file data is imported.
 */
class Banner extends Component {

    /**
     * Set the view id to display by calling
     * setView props method. Also calling
     * setRecipeState to drop the recipeState
     * parent props.
     * 
     * @param {integer} idView : view id to set.
     * 
     * @return : none
     */
    setView = (viewId) => {
        this.props.setRecipeState({});
        this.props.setView(viewId);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { onClick, currentView, inLoadRef } = this.props;

        return (
            <header className="banner">
                <div>
                    {currentView !== INPUT_DATE_VIEW &&
                        <div>
                            <button onClick={() => onClick()} className="button-drop-down-menu"><i className="fas fa-bars"></i></button>
                        </div>
                    }

                    <img onClick={() => { currentView !== INPUT_DATE_VIEW ? this.setView(INPUT_MEAL_VIEW) : console.log("[LOG] Start / End dates must be entered before access to the InputMealView.") }} src={MealYou} width="125px" alt="MealYou" />
                </div>

                <div
                    className="loading-spinner"
                    ref={inLoadRef}
                ><i className="fas fa-spinner"></i></div>
            </header>
        )
    }
}

Banner.propTypes = {
    ingredientList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
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
    currentView: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    setRecipeState: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default Banner;
