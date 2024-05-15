// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@ionic-native/toast';

// Components import
import ExportButton from './ExportButton';

// Styles import
import '../theme/DropDownMenu.css';

// Constants import
import {
    SEARCH_RECIPE_VIEW,
    TOAST_TIMER
} from '../const';

/**
 * DropDownMenu component display an <header> HTML
 * Component on the top of the page.
 * It is displayed on each views except InputDateView.
 * Its content is adapted to the current view.
 */
class DropDownMenu extends Component {

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
     * Display or undisplay the PopUpConfirmation component
     * from the DropDownMenu component by calling
     * toggleDropDownMenuPopUpConfirmation props function.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUpConfirmationRemove = () => {
        this.props.toggleDropDownMenuPopUpConfirmation();
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { ingredientList, recipeList, productList } = this.props;

        return (
            <div className="background-drop-down-menu" onClick={() => this.props.toggleDropDownMenu()}>
                <div className="drop-down-menu">

                    <ExportButton
                        ingredientList={ingredientList}
                        recipeList={recipeList}
                        productList={productList}
                        className="drop-down-menu-element"
                    ><i className="fas fa-download"></i></ExportButton>


                    <div className="drop-down-menu-element" onClick={() => this.setView(SEARCH_RECIPE_VIEW)}>
                        <i className="fas fa-pen"></i>
                    </div>


                    <div className="drop-down-menu-element" onClick={() => {
                        if (ingredientList.length > 0) {
                            this.togglePopUpConfirmationRemove();
                        } else {
                            Toast.show("Votre liste de recettes et/ou d'ingrédients est vide !", TOAST_TIMER, "bottom").subscribe(
                                toast => {
                                    console.log(toast);
                                }
                            );
                        }
                    }}>
                        <i className="fas fa-trash"></i>
                    </div>

                </div>
            </div>
        )
    }
}

DropDownMenu.propTypes = {
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
    mealList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    setRecipeState: PropTypes.func.isRequired,
    toggleDropDownMenu: PropTypes.func.isRequired,
    toggleDropDownMenuPopUpConfirmation: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
};

export default DropDownMenu;