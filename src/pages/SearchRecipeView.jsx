// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import SearchBar from '../components/SearchBar';
import RecipeViewer from '../components/RecipeViewer';
import BackButton from '../components/BackButton';

// Constants import
import {
    EDIT_RECIPE_VIEW,
    INPUT_MEAL_VIEW
} from '../const';

/**
 * SearchRecipeView class is used to display all
 * recipes and details of each recipe. It also
 * allows to search a recipe by keyword.
 * When a recipe details is displayed, you can
 * update or remove the recipe.
 */
class SearchRecipeView extends Component {

    /**
     * Constructor of class SearchRecipeView.
     */
    constructor(props) {
        super(props);

        this.state = {
            keyword: ""
        }
    }

    /**
     * Update keyword's value when input search bar
     * content change.
     * 
     * @param {JSX} e : the input search element.
     * 
     * @return : none
     */
    handleKeyword = (e) => {
        const value = e.target.value;

        this.setState({
            keyword: value
        });
    }

    /**
     * Remove inputed keyword by updating state
     * keyword.
     * 
     * @param : none
     * 
     * @return : none
     */
    removeKeyword = () => {
        this.setState({
            keyword: ""
        });
    }

    /**
     * Set the recipeState array props by calling
     * the setRecipeState props method.
     * 
     * @param {Object} recipe : the recipe to update.
     * 
     * @param {integer} id : the recipe id.
     * 
     * @return : none
     */
    setRecipeState = (recipe, id) => {
        const { ingredientList } = this.props;

        const ingredientRecipeList = recipe.ingredients.map((ingredientRef) => {
            const ingredient = ingredientList[ingredientRef.id];

            return {
                id: ingredientRef.id,
                name: ingredient.name,
                amount: ingredientRef.amount
            }
        });

        this.props.setRecipeState({
            idRecipe: id,
            nameRecipe: recipe.name,
            descriptionRecipe: recipe.description,
            nameRecipeAlreadyUsed: true,
            ingredientRecipeList: ingredientRecipeList,
            ingredientSelectedList: [], // Array of selected recipes ID
            displayPopUpConfirmation: false,
            previousView: EDIT_RECIPE_VIEW
        });

        this.props.setView(EDIT_RECIPE_VIEW);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { keyword } = this.state;

        return (
            <React.Fragment>

                <SearchBar
                    onChange={this.handleKeyword}
                    removeKeyword={this.removeKeyword}
                    keyword={keyword}
                />

                <RecipeViewer
                    ingredientList={this.props.ingredientList}
                    recipeList={this.props.recipeList}
                    mealList={this.props.mealList}
                    inLoadRef={this.props.inLoadRef}
                    keyword={keyword}
                    importDatas={this.props.importDatas}
                    setRecipeList={this.props.setRecipeList}
                    setMealList={this.props.setMealList}
                    setRecipeState={this.setRecipeState}
                    setView={this.props.setView}
                />

                <div className="container-5">
                    <BackButton
                        onClick={this.props.setView}
                        previousView={INPUT_MEAL_VIEW}
                    />
                </div>

            </React.Fragment>
        );
    }
}

SearchRecipeView.propTypes = {
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
    importDatas: PropTypes.func.isRequired,
    setRecipeList: PropTypes.func.isRequired,
    setMealList: PropTypes.func.isRequired,
    setRecipeState: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
};

export default SearchRecipeView;