// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import LineRecipe from './LineRecipe';
import ImportButton from './ImportButton';

// Styles import
import '../theme/RecipeViewer.css';

// Constants import


/**
 * RecipeViewer class is a component used to display all
 * recipe loaded to display name, description and ingredients.
 * It is also used to update or remove a recipe.
 */
class RecipeViewer extends Component {

    /**
     * Constructor of class RecipeViewer.
     */
    constructor(props) {
        super(props);

        const displayRecipes = [];

        props.recipeList.map((recipe) => {
            displayRecipes.push(false);
            return null;
        })

        this.state = {
            displayRecipes: displayRecipes
        }
    }

    /**
     * Display or undisplay the recipe details with the
     * id parameter by updating displayRecipes state.
     * 
     * @param {integer} id : the id of the recipe which
     *                       has to display its details.
     * 
     * @return : none
     */
    toggleDisplayRecipes = (id) => {
        const { displayRecipes } = this.state;

        const newDisplayRecipes = displayRecipes.map((display, index) => {
            if (id === index) {
                return !display;
            } else {
                return display;
            }
        });

        this.setState({
            displayRecipes: newDisplayRecipes
        });
    }

    /**
     * Remove a recipe from recipeList props
     * which has the right id by calling
     * setRecipeList props function.
     * It also adapte the mealList props
     * accordingly.
     * 
     * @param {integer} id : 
     * 
     * @return : none
     */
    removeRecipe = (id) => {
        const { recipeList, mealList } = this.props;
        const { displayRecipes } = this.state;

        const idMealList = mealList.findIndex((meal) => meal.id === id);

        if (idMealList >= 0) {
            mealList.splice(idMealList, 1);
            this.props.setMealList(mealList);
        }

        recipeList.splice(id, 1);
        displayRecipes.splice(id, 1);

        this.setState({
            displayRecipes: displayRecipes
        });

        this.props.setRecipeList(recipeList);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { ingredientList, recipeList, keyword } = this.props;
        const { displayRecipes } = this.state;
        let elementFind = false;

        return (
            <React.Fragment>

                <div className="div-recipe-viewer">
                    {recipeList.map((recipe, index) => {

                        if (recipe.name.toUpperCase().includes(keyword.toUpperCase())) {
                            elementFind = true;

                            return (
                                <LineRecipe
                                    key={index}
                                    id={index}
                                    recipe={recipe}
                                    ingredientList={ingredientList}
                                    displayRecipe={displayRecipes[index]}
                                    setRecipeState={this.props.setRecipeState}
                                    toggleDisplayRecipes={this.toggleDisplayRecipes}
                                    removeRecipe={this.removeRecipe}
                                />
                            );

                        } else {
                            return null;

                        }
                    })}

                    {/*
                        Message to display if the inputed keyword is not
                        associated with any recipe.
                     */}
                    {!elementFind &&
                        <p>Aucun élément à afficher</p>

                    }

                    {/*
                        Display an ImportButton component if ingredientList props
                        is empty to load recipes/ingredients from a JSON file.
                    */}
                    {ingredientList.length === 0 &&
                        <div className="parent-import-button-component">
                            <div className="import-button-component">

                                <ImportButton
                                    inLoadRef={this.props.inLoadRef}
                                    importDatas={this.props.importDatas}
                                    setView={this.props.setView}
                                />

                            </div>
                        </div>
                    }
                </div>

            </React.Fragment>
        );
    }
}

RecipeViewer.propTypes = {
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
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    keyword: PropTypes.string.isRequired,
    importDatas: PropTypes.func.isRequired,
    setRecipeList: PropTypes.func.isRequired,
    setMealList: PropTypes.func.isRequired,
    setRecipeState: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
};

export default RecipeViewer;