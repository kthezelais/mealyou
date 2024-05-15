// Libraries import
import React, { Component } from 'react';
import { Toast } from '@ionic-native/toast';

// pages import
import InputDateView from './pages/InputDateView.jsx';
import InputMealView from './pages/InputMealView.jsx';
import InputRecipeView from './pages/InputRecipeView.jsx';
import InputIngredientView from './pages/InputIngredientView.jsx';
import OutputMealView from './pages/OutputMealView.jsx';
import SearchRecipeView from './pages/SearchRecipeView.jsx';
import EditRecipeView from './pages/EditRecipeView.jsx';
import InputOtherView from './pages/InputOtherView.jsx';

// Components import
import Banner from './components/Banner.jsx';
import BreadCrumb from './components/BreadCrumb.jsx';
import DropDownMenu from './components/DropDownMenu.jsx';
import PopUpConfirmation from './pages/Pop-Ups/PopUpConfirmation.jsx';

// Styles import
import './theme/App.css';

// Constants
import {
    INPUT_MEAL_VIEW,
    INPUT_DATE_VIEW,
    INPUT_RECIPE_VIEW,
    INPUT_INGREDIENT_VIEW,
    OUTPUT_MEAL_VIEW,
    SEARCH_RECIPE_VIEW,
    EDIT_RECIPE_VIEW,
    INIT_NB_MEAL,
    TOAST_TIMER,
    INPUT_OTHER_VIEW,
    INPUT_PRODUCT_VIEW,
    //TMP_RECIPES,            /* TO-DEBUG */
    //TMP_INGREDIENTS,        /* TO-DEBUG */
    //TMP_MEALS               /* TO-DEBUG */
} from './const.jsx'
import InputProductView from './pages/InputProductView.jsx';

/**
 * App class is a component use to centralize
 * the global application state. It is also use
 * to display the right view at the right time.
 */
class App extends Component {

    /**
     * Constructor of class App.
     */
    constructor(props) {
        super(props);
        // productList, selectedProductList, products
        this.state = {
            currentView: INPUT_DATE_VIEW, // Current view ID                 /* TO-DELETE */
            nbMeal: INIT_NB_MEAL,  // Meal amount / day
            mealList: [], // Array of selected meals                                            /* TO-DELETE */
            productList: [], // Array of products available
            products: [], // Array of selected products
            ingredientList: [], // Array of ingredients available             /* TO-DELETE */
            recipeList: [], // Array of recipes available                         /* TO-DELETE */
            recipeState: {}, // Save of InputRecipeView or EditRecipeView when it's necessary
            recipesSelectedList: [], // Array of selected recipes ID
            selectedProductList: [], // Array of selected products ID
            startDate: "", // String of the input start date                          /* TO-DELETE */
            endDate: "", // String of the input end date                               /* TO-DELETE */
            displayDropDownMenu: false, // Display drop down menu or not
            displayDropDownMenuPopUpConfirmation: false // Display PopUpConfirmation of DropDownMenu
        }

        this.inLoad = React.createRef(); // Use to display a spinner loader
    }

    /**
     * Display or undisplay the DropDownMenu component by
     * updating displayDropDownMenu state.
     * 
     * @param : none
     * 
     * @return : none
     */
    toggleDropDownMenu = () => {
        const { displayDropDownMenu } = this.state;

        this.setState({
            displayDropDownMenu: !displayDropDownMenu
        });
    }

    /**
     * Display or undisplay the PopUpConfirmation component
     * from the DropDownMenu component by updating
     * displayDropDownMenuPopUpConfirmation state.
     * 
     * @param : none
     * 
     * @return : none
     */
    toggleDropDownMenuPopUpConfirmation = () => {
        const { displayDropDownMenuPopUpConfirmation } = this.state;

        this.setState({
            displayDropDownMenuPopUpConfirmation: !displayDropDownMenuPopUpConfirmation
        });
    }

    /**
     * Update start date into the global state
     * of the application.
     * 
     * @param {Date} date : input start date. 
     * 
     * @return : none
     */
    handleStartDate = (date) => {
        this.setState({ startDate: date });
    }

    /**
     * Update end date into the global state
     * of the application.
     * 
     * @param {Date} date : input end date.
     * 
     * @return : none
     */
    handleEndDate = (date) => {
        this.setState({ endDate: date });
    }

    /**
     * Update meal amount / day into the global state
     * og the application.
     * 
     * @param {integer} number : input meal amount / day.
     * 
     * @return : none
     */
    handleNbMeal = (number) => {
        this.setState({ nbMeal: number });
    }

    /**
     * Get the meal amount needed from the days number
     * between start date and end date times the meal
     * amount / day.
     * 
     * @param : none
     * 
     * @return {integer} : meal amount needed.
     */
    getNbMealNeeded = () => {
        const { nbMeal, startDate, endDate } = this.state;

        const start = new Date(startDate),
            end = new Date(endDate),
            difference = end.getTime() - start.getTime();

        const res = (((difference) / (1000 * 86400) + 1) * nbMeal);

        return res;
    }

    /**
     * Set the mealList array state from the mealList array
     * parameter.
     * 
     * @param {Array} mealList : updated mealList array to set.
     * 
     * @return : none
     */
    setMealList = (mealList) => {
        this.setState({
            mealList: mealList
        })
    }

    /**
     * Set the recipesSelectedList array state from the
     * recipesSelectedList array parameter.
     * 
     * @param {Array} recipesSelectedList : updated recipesSelectedList
     *                                      array to set.
     * 
     * @return : none
     */
    setRecipesSelectedList = (recipesSelectedList) => {
        this.setState({
            recipesSelectedList: recipesSelectedList
        })
    }

    /**
     * Set the recipeList array state from the
     * recipeList array parameter.
     * 
     * @param {Array} recipeList : updated recipeList
     *                                 array to set.
     * 
     * @return : none
     */
    setRecipeList = (recipeList) => {
        this.setState({
            recipeList: recipeList
        });
    }

    /**
     * Set the ingredientList array state from the
     * ingredientList array parameter.
     * 
     * @param {Array} ingredientList : updated ingredientList
     *                                 array to set.
     * 
     * @return : none
     */
    setIngredientList = (ingredientList) => {
        this.setState({
            ingredientList: ingredientList
        });
    }

    /**
     * Set the recipeState array state from the
     * recipeState array parameter.
     * 
     * @param {Array} recipeState : updated recipeState
     *                                 array to set.
     * 
     * @return : none
     */
    setRecipeState = (recipeState) => {
        this.setState({
            recipeState: recipeState
        });
    }

    /**
     * Set the productList array state from the
     * productList array parameter.
     * 
     * @param {Array} productList : updated productList
     *                                 array to set.
     * 
     * @return : none
     */
    setProductList = (productList) => {
        this.setState({
            productList: productList
        });
    }

    /**
     * Set the selectedProductList array state from the
     * selectedProductList array parameter.
     * 
     * @param {Array} selectedProductList : updated selectedProductList
     *                                 array to set.
     * 
     * @return : none
     */
    setSelectedProductList = (selectedProductList) => {
        this.setState({
            selectedProductList: selectedProductList
        });
    }

    /**
     * Set the products array state from the
     * products array parameter.
     * 
     * @param {Array} products : updated products
     *                                 array to set.
     * 
     * @return : none
     */
    setProducts = (products) => {
        this.setState({
            products: products
        });
    }

    /**
     * Set the view id to display.
     * 
     * @param {integer} idView : view id to set.
     * 
     * @return : none
     */
    setView = (idView) => {
        this.setState({
            currentView: idView,
            displayDropDownMenu: false
        });
    }

    /**
     * Use to reset default values of App state
     * by using setState function. 
     * 
     * @param : none
     * 
     * @return : none
     */
    reinitApp = () => {
        const { startDate, endDate, nbMeal } = this.state;

        this.setState({
            currentView: INPUT_MEAL_VIEW,
            nbMeal: nbMeal,
            mealList: [],
            productList: [],
            products: [],
            ingredientList: [],
            recipeList: [],
            recipeState: {},
            recipesSelectedList: [],
            selectedProductList: [],
            startDate: startDate,
            endDate: endDate,
            displayDropDownMenu: false
        });

        Toast.show("Toutes vos recettes et ingrédients ont été supprimée.", TOAST_TIMER, "bottom").subscribe(
            toast => {
                console.log(toast);
            }
        );
    }


    /**
     * Import recipes and ingredients list from a JSON
     * object. It also remove all elements in mealList
     * state.
     * 
     * @param {JSONObject} JSONParsedFile : json object used to set the
     *                                      updated values of recipeList
     *                                      and ingredientList states.
     * 
     * @return : none
     */
    importDatas = (JSONParsedFile) => {
        const { ingredientList, recipeList, productList } = JSONParsedFile;

        this.setState({
            ingredientList: ingredientList,
            recipeList: recipeList,
            productList: productList,
            mealList: [],
        });
    }

    /**
     * Display the right view from the currentView state.
     * 
     * @param : none
     * 
     * @return {JSX} : the JSX component to display. 
     */
    displayView = () => {
        const { currentView } = this.state;

        // Display the InputDateView view
        if (currentView === INPUT_DATE_VIEW) {
            const { startDate, endDate, nbMeal, mealList } = this.state;

            return (
                <InputDateView
                    nbMeal={nbMeal}
                    mealList={mealList}
                    startDate={startDate}
                    endDate={endDate}
                    updateMealList={this.setMealList}
                    handleStartDate={this.handleStartDate}
                    handleEndDate={this.handleEndDate}
                    handleNbMeal={this.handleNbMeal}
                    setView={this.setView}
                />
            );

            // Display the InputMealView view
        } else if (currentView === INPUT_MEAL_VIEW) {
            const { mealList, recipeList, recipesSelectedList } = this.state;
            const canImport = this.state.ingredientList.length === 0;

            return (
                <InputMealView
                    recipeList={recipeList}
                    mealList={mealList}
                    recipesSelectedList={recipesSelectedList}
                    canImport={canImport}
                    getNbMealNeeded={this.getNbMealNeeded}
                    setRecipesSelectedList={this.setRecipesSelectedList}
                    setMealList={this.setMealList}
                    inLoadRef={this.inLoad}
                    importDatas={this.importDatas}
                    setView={this.setView}
                />
            );

            // Display the InputRecipeView view
        } else if (currentView === INPUT_RECIPE_VIEW) {
            const { ingredientList, recipeList, recipeState } = this.state;
            const canImport = ingredientList.length === 0;

            return (
                <InputRecipeView
                    ingredientList={ingredientList}
                    recipeList={recipeList}
                    newRecipeState={recipeState}
                    canImport={canImport}
                    setRecipeList={this.setRecipeList}
                    setRecipeState={this.setRecipeState}
                    inLoadRef={this.inLoad}
                    importDatas={this.importDatas}
                    setView={this.setView}
                />
            );

            // Display the InputIngredientView view
        } else if (currentView === INPUT_INGREDIENT_VIEW) {
            const { ingredientList, productList, recipeState } = this.state;

            return (
                <InputIngredientView
                    ingredientList={ingredientList}
                    productList={productList}
                    setIngredientList={this.setIngredientList}
                    importDatas={this.importDatas}
                    setView={this.setView}
                    previousView={recipeState.previousView}
                />
            );

            // Display the OutputMealView view
        } else if (currentView === OUTPUT_MEAL_VIEW) {
            const { ingredientList, recipeList, mealList, productList, products } = this.state;

            return (
                <OutputMealView
                    ingredientList={ingredientList}
                    recipeList={recipeList}
                    mealList={mealList}
                    productList={productList}
                    products={products}
                    setView={this.setView}
                />
            );

            // Display the SearchRecipeView view
        } else if (currentView === SEARCH_RECIPE_VIEW) {
            const { ingredientList, recipeList, mealList } = this.state;

            return (
                <SearchRecipeView
                    ingredientList={ingredientList}
                    recipeList={recipeList}
                    mealList={mealList}
                    inLoadRef={this.inLoad}
                    importDatas={this.importDatas}
                    setRecipeList={this.setRecipeList}
                    setMealList={this.setMealList}
                    setRecipeState={this.setRecipeState}
                    setView={this.setView}
                />
            );

            // Display the EditRecipeView view
        } else if (currentView === EDIT_RECIPE_VIEW) {
            const { ingredientList, recipeList, mealList, recipeState } = this.state;
            const canImport = ingredientList.length === 0;

            return (
                <EditRecipeView
                    ingredientList={ingredientList}
                    recipeList={recipeList}
                    mealList={mealList}
                    recipeToEdit={recipeState}
                    canImport={canImport}
                    setRecipeList={this.setRecipeList}
                    setRecipeState={this.setRecipeState}
                    setMealList={this.setMealList}
                    inLoadRef={this.inLoad}
                    importDatas={this.importDatas}
                    setView={this.setView}
                />
            );

            // Display the InputOtherView view
        } else if (currentView === INPUT_OTHER_VIEW) {
            const { productList, selectedProductList, products } = this.state;

            return (
                <InputOtherView
                    productList={productList}
                    selectedProductList={selectedProductList}
                    products={products}
                    setProductList={this.setProductList}
                    setSelectedProductList={this.setSelectedProductList}
                    setProducts={this.setProducts}
                    setView={this.setView}
                />
            );

            // Display the InputProductView view
        } else if (currentView === INPUT_PRODUCT_VIEW) {
            const { productList, ingredientList } = this.state;

            return (
                <InputProductView
                    productList={productList}
                    ingredientList={ingredientList}
                    setProductList={this.setProductList}
                    setView={this.setView}
                    previousView={INPUT_OTHER_VIEW}
                />
            );
        }
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { ingredientList, recipeList, mealList, recipeState, currentView,
            displayDropDownMenu, displayDropDownMenuPopUpConfirmation, productList } = this.state;
        const view = this.displayView();

        return <React.Fragment>

            <Banner
                ingredientList={ingredientList}
                recipeList={recipeList}
                currentView={currentView}
                onClick={this.toggleDropDownMenu}
                setRecipeState={this.setRecipeState}
                setView={this.setView}
                inLoadRef={this.inLoad} // Reference to the loading spinner
            />

            {currentView > INPUT_DATE_VIEW &&
                <BreadCrumb
                    viewId={currentView}
                    previousView={recipeState.previousView}
                />
            }

            {view}

            {displayDropDownMenu &&
                <DropDownMenu
                    ingredientList={ingredientList}
                    recipeList={recipeList}
                    productList={productList}
                    mealList={mealList}
                    setRecipeState={this.setRecipeState}
                    toggleDropDownMenu={this.toggleDropDownMenu}
                    toggleDropDownMenuPopUpConfirmation={this.toggleDropDownMenuPopUpConfirmation}
                    setView={this.setView}
                />
            }

            {/* #######################################################################################################*/}
            {/* ############################################ POPUP MANAGER ############################################*/}
            {/* #######################################################################################################*/}

            {displayDropDownMenuPopUpConfirmation && // Display PopUpConfirmation if displayPopUpConfirmationRemove state is true */}
                <PopUpConfirmation
                    title="Effacer les recettes / ingrédients / produits"
                    togglePopUpConfirmation={this.toggleDropDownMenuPopUpConfirmation}
                    confirmAction={this.reinitApp}
                >Voulez-vous vraiment effacer toutes vos recettes/ingrédients/produits ?</PopUpConfirmation>
            }

        </React.Fragment>
    }

}

export default App;
