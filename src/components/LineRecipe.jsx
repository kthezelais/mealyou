// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@ionic-native/toast';

// Components import
import PopUpConfirmation from '../pages/Pop-Ups/PopUpConfirmation';

// Styles import
import '../theme/LineRecipe.css';

// Constants import
import {
    TOAST_TIMER
} from '../const';

/**
 * LineRecipe class is use to print an element from a
 * RecipeViewers component. It can remove or update it.
 */
class LineRecipe extends Component {

    /**
     * Constructor of class LineRecipe.
     */
    constructor(props) {
        super(props);

        this.state = {
            displayPopUpConfirmationRemove: false
        }
    }

    /**
     * Diplay or undisplay PopUpConfirmation by toggling
     * displayPopUpConfirmationRemove state.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUpConfirmationRemove = () => {
        const { displayPopUpConfirmationRemove } = this.state;

        this.setState({
            displayPopUpConfirmationRemove: !displayPopUpConfirmationRemove
        });
    }

    /**
     * Display or undisplay details about the recipe
     * by calling toggleDisplayRecipes props function.
     * 
     * @param : none
     * 
     * @return : none
     */
    toggleDisplayRecipes = () => {
        const { id } = this.props;

        this.props.toggleDisplayRecipes(id);
    }

    /**
     * Load the recipe state by calling setRecipeState
     * props function.
     * 
     * @param : none
     * 
     * @return : none
     */
    editRecipe = () => {
        const { recipe, id } = this.props;

        this.props.setRecipeState(recipe, id);
    }

    /**
     * Remove the recipe by calling removeRecipe
     * props function. Display a Toast message to
     * indicate that the recipe has been removed.
     * 
     * @param : none
     * 
     * @return : none
     */
    removeRecipe = () => {
        const { id, recipe } = this.props;

        this.props.removeRecipe(id);

        Toast.show("La recette " + recipe.name + " a été supprimé de votre liste de recette", TOAST_TIMER, "bottom").subscribe(
            toast => {
                console.log(toast);
            }
        );
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { id, recipe, ingredientList, displayRecipe } = this.props;
        const { displayPopUpConfirmationRemove } = this.state;

        return (
            <React.Fragment>
                <div className="recipe-line">
                    <header>
                        <button onClick={() => this.toggleDisplayRecipes(id)} className="more-button">+</button>
                        {recipe.name}

                        {displayRecipe &&
                            <div className="div-recipe-line-action-button">
                                <button className="edit-recipe-button" onClick={() => this.editRecipe()}><i className="fas fa-pen"></i></button>
                                <button className="remove-recipe-button" onClick={() => this.togglePopUpConfirmationRemove()}><i className="fas fa-trash"></i></button>
                            </div>
                        }
                    </header>

                    {/*
                        Details of the recipe to display when
                        the + button has been clicked.
                    */}
                    {displayRecipe &&
                        <React.Fragment>
                            <div className="div-details-recipe">
                                {recipe.description !== "" ? recipe.description : "Aucune description."}
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => {
                                        return <li key={index}>{ingredientList[ingredient.id].name} x {ingredient.amount}</li>
                                    })}
                                </ul>
                            </div>
                        </React.Fragment>
                    }
                </div>

                {/* #######################################################################################################*/}
                {/* ############################################ POPUP MANAGER ############################################*/}
                {/* #######################################################################################################*/}

                {displayPopUpConfirmationRemove && // Display PopUpConfirmation if displayPopUpConfirmationRemove state is true
                    <PopUpConfirmation
                        title="Supprimer la recette"
                        togglePopUpConfirmation={this.togglePopUpConfirmationRemove}
                        confirmAction={this.removeRecipe}
                    >Voulez-vous vraiment supprimer <b>{recipe.name}</b> de votre liste de recette ?</PopUpConfirmation>
                }
            </React.Fragment>
        )
    }
}

LineRecipe.propTypes = {
    id: PropTypes.number.isRequired,
    recipe: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                amount: PropTypes.number.isRequired
            }).isRequired
        ).isRequired
    }).isRequired,
    ingredientList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    displayRecipe: PropTypes.bool.isRequired,
    setRecipeState: PropTypes.func.isRequired,
    toggleDisplayRecipes: PropTypes.func.isRequired,
    removeRecipe: PropTypes.func.isRequired
};

export default LineRecipe;