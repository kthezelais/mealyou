// Libraries import
import React, { Component } from 'react';
import { Toast } from '@ionic-native/toast';

// Components import
import FormInput from '../components/FormInput';
import TableIngredient from '../components/TableIngredient';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import PopUpConfirmation from './Pop-Ups/PopUpConfirmation';

// Constants import
import {
    INPUT_MEAL_VIEW,
    INPUT_RECIPE_VIEW,
    INPUT_INGREDIENT_VIEW,
    DEFAULT_MAX_INGREDIENT,
    SUBMIT_RECIPE_VIEW,
    TOAST_TIMER
} from '../const';

/**
 * InputRecipeView class is the view which is called from InputMealView
 * view if a new recipe has to be created. It is displayed when App state
 * currentView is set as INPUT_RECIPE_VIEW. This view is used to create a
 * new recipe to add into the recipeList App state.
 */
class InputRecipeView extends Component {

    /**
     * Constructor of class InputRecipeView.
     * Check if its states have been saved before
     * or not.
     * It's initialazed state value accordingly.
     */
    constructor(props) {
        super(props);

        if (JSON.stringify(props.newRecipeState) !== "{}") { // Restoring previous state if exists
            this.state = props.newRecipeState;
        } else {
            this.state = {
                nameRecipe: "",
                descriptionRecipe: "",
                nameRecipeAlreadyUsed: true,
                ingredientRecipeList: [],
                ingredientSelectedList: [], // Array of selected recipes ID
                displayPopUpConfirmation: false
            }
        }
    }

    /**
     * Diplay or undisplay PopUpConfirmation by toggling displayPopUpConfirmation state.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUpConfirmation = () => {
        const { displayPopUpConfirmation } = this.state;

        this.setState({
            displayPopUpConfirmation: !displayPopUpConfirmation
        });
    }

    /**
     * Update the nameRecipe state from the
     * name parameter.
     * 
     * @param {string} name : updated name to set.
     * 
     * @return : none
     */
    updateNameRecipe = (name) => {
        this.setState({
            nameRecipe: name
        });
    }

    /**
     * Update the descriptionRecipe state from the
     * description parameter.
     * 
     * @param {string} description : updated description to set.
     * 
     * @return : none
     */
    updateDescriptionRecipe = (description) => {
        this.setState({
            descriptionRecipe: description
        });
    }

    /**
     * Set the new value of the attribute nameRecipeAlreadyUsed
     * to the error parameter value :
     *                  False = OK; True = ERROR.
     * 
     * @param {boolean} error : value of nameRecipeAlreadyUsed
     *                          updated. 
     * 
     * @return : none
     */
    updateNameRecipeAlreadyUsed = (error) => {
        this.setState({
            nameRecipeAlreadyUsed: error
        });
    }

    /**
     * Set the ingredientRecipeList state from the
     * ingredientRecipeList parameter.
     * 
     * @param {string} ingredientRecipeList : updated ingredientRecipeList
     *                                        to set.
     * 
     * @return : none
     */
    setIngredientRecipeList = (ingredientRecipeList) => {
        this.setState({
            ingredientRecipeList: ingredientRecipeList
        });
    }

    /**
     * Set the ingredientSelectedList state from the
     * ingredientSelectedList parameter.
     * 
     * @param {string} ingredientSelectedList : updated ingredientSelectedList
     *                                          to set.
     * 
     * @return : none
     */
    setIngredientSelectedList = (ingredientSelectedList) => {
        this.setState({
            ingredientSelectedList: ingredientSelectedList
        });
    }

    /**
     * Use to save the view states by sending them
     * back to parent component.
     * 
     * @param : none
     * 
     * @return : none
     */
    saveState = () => {
        this.props.setRecipeState({
            ...this.state,
            previousView: INPUT_RECIPE_VIEW
        });

        this.props.setView(INPUT_INGREDIENT_VIEW);
    }

    /**
     * Set the view id to display by calling setView
     * props after emptying state view by calling
     * setRecipeState props.
     * 
     * @param {integer} idView : view id to set.
     * 
     * @return : none
     */
    setView = (idView) => {
        this.props.setRecipeState({});
        this.props.setView(idView);
    }

    /**
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
        const { recipeList } = this.props;
        const { nameRecipe, descriptionRecipe, ingredientRecipeList } = this.state;

        const ingredientList = [];

        for (let i = 0; i < ingredientRecipeList.length; i++) {
            ingredientList.push({
                id: ingredientRecipeList[i].id,
                amount: ingredientRecipeList[i].amount
            })
        }

        const newRecipe = {
            name: nameRecipe,
            description: descriptionRecipe,
            ingredients: ingredientList
        };

        this.props.setRecipeList([...recipeList, newRecipe]);

        // Add recipe success message
        Toast.show(nameRecipe + " a été ajouté à votre liste de recettes !", TOAST_TIMER, "bottom").subscribe(
            toast => {
                console.log(toast);
            }
        );

        this.setView(INPUT_MEAL_VIEW);
    }

    /**
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
        const { recipeList } = this.props;
        const { nameRecipe, ingredientRecipeList } = this.state;

        if (ingredientRecipeList.length > 0
            && !FormInput.checkName(recipeList, nameRecipe)
            && nameRecipe !== ""
            && nameRecipe[nameRecipe.length - 1] !== " ") {

            return true;
        }

        return false;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { recipeList, ingredientList, canImport } = this.props;
        const { nameRecipe, descriptionRecipe, ingredientRecipeList, ingredientSelectedList,
            nameRecipeAlreadyUsed, displayPopUpConfirmation } = this.state;

        return (
            <React.Fragment>

                <div className="container-2" >

                    <FormInput
                        elementList={recipeList} // Use to check if the name is already in use.
                        name={nameRecipe}
                        description={descriptionRecipe}
                        error={nameRecipeAlreadyUsed}
                        currentView={INPUT_RECIPE_VIEW}
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
                        previousView={INPUT_MEAL_VIEW}
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
                            title="Confirmer nouvelle recette"
                            togglePopUpConfirmation={this.togglePopUpConfirmation}
                            confirmAction={this.onSubmitState}
                        >Voulez-vous confirmer l'ajout de cette nouvelle recette à votre liste ?</PopUpConfirmation>
                    }

                </div>


            </React.Fragment>

        );
    }
}

export default InputRecipeView;