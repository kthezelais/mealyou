// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

// Constants import
import {
    DEFAULT_MAX_INGREDIENT,
    INPUT_MEAL_VIEW,
    INPUT_PRODUCT_VIEW,
    OUTPUT_MEAL_VIEW,
    SUBMIT_INGREDIENT_VIEW
} from '../const';
import PopUpConfirmation from './Pop-Ups/PopUpConfirmation';
import Table from '../components/Table';

/**
 * InputOtherView class is the view which is called from InputMealView
 * view when the inputed mealList has been submited. It is displayed when
 * App state currentView is set as INPUT_OTHER_VIEW. This view is used to 
 * add other products not needed in a meal (like household products, water,
 * makeup, etc). It can also regulate the amount of some ingredients used in
 * a selected recipe if the amount is too large or too small (like ketchup
 * or sugar for example).
 */
class InputOtherView extends Component {

    /**
     * 
     */
    constructor(props) {
        super(props);

        this.state = {
            displaySubmitConfirmation: false
        }
    }

    /**
     * Diplay or undisplay PopUpConfirmation by toggling
     * displaySubmitConfirmation state.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUpSubmitConfirmation = () => {
        const { displaySubmitConfirmation } = this.state;

        this.setState({
            displaySubmitConfirmation: !displaySubmitConfirmation
        });
    }

    /**
     * Print JSX from its states and props
     * 
     *              productList={productList}
                    selectedProductList={selectedProductList}
                    products={products}
                    setProductList={this.setProductList}
                    setSelectedProductList={this.setSelectedProductList}
                    setProducts={this.setProducts}
                    setView={this.setView}
     */
    render() {
        const { productList, selectedProductList, products } = this.props;
        const { displaySubmitConfirmation } = this.state;

        return (
            <React.Fragment>

                <Table
                    elementList={products}
                    popUpElementList={productList}
                    selectedPopUpElementList={selectedProductList}
                    maxElementAmount={DEFAULT_MAX_INGREDIENT}
                    canImport={false}
                    updateElementList={this.props.setProducts}
                    updateSelectedPopUpElementList={this.props.setSelectedProductList}
                    importDatas={() => null}
                    setView={this.props.setView}
                    setViewImport={() => null}
                    nextView={INPUT_PRODUCT_VIEW}
                >Produits à ajouter</Table>

                <div className="container-4">

                    <BackButton
                        onClick={this.props.setView}
                        previousView={INPUT_MEAL_VIEW}
                    />

                    <SubmitButton
                        onClick={this.togglePopUpSubmitConfirmation}     // TO-UPDATE
                        canSubmit={() => true}                                  // TO-UPDATE
                        className={SUBMIT_INGREDIENT_VIEW}
                    >VALIDER</SubmitButton>

                </div>

                {/* #######################################################################################################*/}
                {/* ############################################ POPUP MANAGER ############################################*/}
                {/* #######################################################################################################*/}

                {displaySubmitConfirmation && // Display PopUpConfirmation if displaySubmitConfirmation state is true */}
                    <PopUpConfirmation
                        title="Avez-vous terminé ?"
                        togglePopUpConfirmation={this.togglePopUpSubmitConfirmation}
                        confirmAction={() => this.props.setView(OUTPUT_MEAL_VIEW)}
                    >Est-ce que cette liste de produits vous convient ?</PopUpConfirmation>
                }


            </React.Fragment>
        );
    }
}

export default InputOtherView;