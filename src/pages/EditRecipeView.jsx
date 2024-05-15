// Libraries import
import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@ionic-native/toast';

// Views import
import InputRecipeView from './InputRecipeView';

// Components import
import FormInput from '../components/FormInput';
import TableIngredient from '../components/TableIngredient';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import PopUpConfirmation from './Pop-Ups/PopUpConfirmation';

// Constants import
import {
    SEARCH_RECIPE_VIEW,
    EDIT_RECIPE_VIEW,
    INPUT_INGREDIENT_VIEW,
    DEFAULT_MAX_INGREDIENT,
    SUBMIT_RECIPE_VIEW,
    TOAST_TIMER
} from '../const';

/**
 * EditRecipeView class is the view which is called from SearchRecipeView
 * view if a recipe has to be update. It is displayed when App state
 * currentView is set as EDIT_RECIPE_VIEW. This view is used to update an
 * existing recipe in recipeList App state.
 */
class EditRecipeView extends InputRecipeView {

    /**
     * Constructor of class EditRecipeView.
     */
    constructor(props) {
        super(props);

        this.state = this.props.recipeToEdit;
    }

    /**
     * (REDEFINITION)
     * Submit states to the parent component by calling
     * parent's props methods.
     * Call setView props and put INPUT_MEAL_VIEW parameter
     * to shutdown the view and load the previous view.
     * 
     * @param : none
     * 
     * @return : none
     */
    onSubmitState = () => {
        const { recipeList, mealList, recipeToEdit } = this.props;
        const { nameRecipe, descriptionRecipe, ingredientRecipeList } = this.state;

        const ingredientList = [];

        for (let i = 0; i < ingredientRecipeList.length; i++) {
            ingredientList.push({
                id: ingredientRecipeList[i].id,
                amount: ingredientRecipeList[i].amount
            })
        }

        const editedRecipe = {
            name: nameRecipe,
            description: descriptionRecipe,
            ingredients: ingredientList
        };

        const newMealList = mealList.map((meal) => {
            if (meal.id === recipeToEdit.idRecipe) {
                return {
                    id: meal.id,
                    name: nameRecipe,
                    amount: meal.amount
                };
            } else {
                return meal;
            }
        });

        const newRecipeList = recipeList.map((recipe, index) => {
            if (index === recipeToEdit.idRecipe) {
                return editedRecipe;
            }

            return recipe;
        });

        this.props.setRecipeList(newRecipeList);
        this.props.setMealList(newMealList);

        // Update recipe success message
        Toast.show("Votre recette " + nameRecipe + " a été mise à jour !", TOAST_TIMER, "bottom").subscribe(
            toast => {
                console.log(toast);
            }
        );

        this.setView(SEARCH_RECIPE_VIEW);
    }

    /**
     * (REDEFINITION)
     * Check if states can be submit to parent component or not.
     * It check the number of ingredients inputed for the recipe,
     * if the recipe name is empty or already used.
     * 
     * @param : none
     * 
     * @return {boolean} : boolean of if states can be submit to
     *                     parent component or not.
     */
    canSubmit = () => {
        const { recipeList, recipeToEdit } = this.props;
        const { nameRecipe, ingredientRecipeList } = this.state;


        if (ingredientRecipeList.length > 0
            && nameRecipe !== ""
            && nameRecipe[nameRecipe.length - 1] !== " ") {

            if (nameRecipe === recipeToEdit.nameRecipe
                || !FormInput.checkName(recipeList, nameRecipe)) {

                return true;
            }
        }

        return false;
    }

    /**
     * (REDEFINITION)
     * Use to save the view states by sending them
     * back to parent component.
     * 
     * @param : none
     * 
     * @return : none
     */
    saveState = (nextView) => {
        this.props.setRecipeState({
            ...this.state,
            previousView: EDIT_RECIPE_VIEW
        });

        this.props.setView(nextView);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { recipeList, ingredientList, canImport, recipeToEdit } = this.props;
        const { nameRecipe, descriptionRecipe, ingredientRecipeList, ingredientSelectedList,
            nameRecipeAlreadyUsed, displayPopUpConfirmation } = this.state;

        return (
            <React.Fragment>

                <div className="container-2" >

                    <FormInput
                        elementList={recipeList} // Use to check if the name is already in use.
                        name={nameRecipe}
                        id={recipeToEdit.idRecipe}
                        description={descriptionRecipe}
                        error={nameRecipeAlreadyUsed}
                        currentView={EDIT_RECIPE_VIEW}
                        setName={this.updateNameRecipe}
                        setDescription={this.updateDescriptionRecipe}
                        setError={this.updateNameRecipeAlreadyUsed}
                    />

                </div>

                <TableIngredient
                    elementList={ingredientRecipeList} // List of ingredient to select as elementList
                    popUpElementList={ingredientList} // Ingredients selected as popUpElementList
                    selectedPopUpElementList={ingredientSelectedList} // Ingredients already selected as popUpElementSelectedList
                    canImport={canImport}
                    maxElementAmount={DEFAULT_MAX_INGREDIENT}
                    updateElementList={this.setIngredientRecipeList}
                    updateSelectedPopUpElementList={this.setIngredientSelectedList}
                    inLoadRef={this.props.inLoadRef}
                    importDatas={this.props.importDatas}
                    setView={this.saveState}
                    setViewImport={this.setView}
                    nextView={INPUT_INGREDIENT_VIEW}
                >Liste d'ingrédients</TableIngredient>
                
                <div className="container-2-bis">

                    <BackButton
                        onClick={this.setView}
                        previousView={SEARCH_RECIPE_VIEW}
                    />

                    <SubmitButton
                        onClick={this.togglePopUpConfirmation}
                        canSubmit={this.canSubmit}
                        className={SUBMIT_RECIPE_VIEW}
                    >VALIDER</SubmitButton>

                    {/* #######################################################################################################*/}
                    {/* ############################################ POPUP MANAGER ############################################*/}
                    {/* #######################################################################################################*/}

                    {displayPopUpConfirmation && // Display PopUpConfirmation if displayPopUpConfirmation state is true
                        <PopUpConfirmation
                            title="Confirmer les modifications"
                            togglePopUpConfirmation={this.togglePopUpConfirmation}
                            confirmAction={this.onSubmitState}
                        >Voulez-vous vraiment apportez ces modifications à la recette <b>{recipeToEdit.nameRecipe}</b> ?</PopUpConfirmation>
                    }

                </div>

            </React.Fragment>

        );
    }
}

EditRecipeView.propTypes = {
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
    recipeToEdit: PropTypes.shape({
        idRecipe: PropTypes.number.isRequired,
        nameRecipe: PropTypes.string.isRequired,
        descriptionRecipe: PropTypes.string.isRequired,
        nameRecipeAlreadyUsed: PropTypes.bool.isRequired,
        ingredientRecipeList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired
            }).isRequired
        ).isRequired
    }),
    canImport: PropTypes.bool.isRequired,
    setRecipeList: PropTypes.func.isRequired,
    setRecipeState: PropTypes.func.isRequired,
    setMealList: PropTypes.func.isRequired,
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    importDatas: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
};

export default EditRecipeView;