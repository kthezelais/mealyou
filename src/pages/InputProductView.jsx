// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@ionic-native/toast';

// Components import
import FormInput from '../components/FormInput';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

// Constants import
import {
    INPUT_INGREDIENT_VIEW,
    SUBMIT_INGREDIENT_VIEW,
    TOAST_TIMER
} from '../const';

/**
 * InputProductView class is the view which is called from InputOtherView
 * view if a new product has to be created. It is displayed when App state
 * currentView is set as INPUT_PRODUCT_VIEW. This view is used to create a
 * new product to add into the productList App state.
 */
class InputProductView extends Component {

    /**
     * Constructor of class InputProductView.
     */
    constructor(props) {
        super(props);

        this.state = {
            nameProduct: "",
            priceProduct: "",
            nameProductAlreadyUsed: false
        }

        this.inputProductRef = React.createRef(); // Use to focus input text product after submit
    }

    /**
 * Update the nameProduct state from the
 * name parameter.
 * 
 * @param {string} name : updated name to set.
 * 
 * @return : none
 */
    updateNameProduct = (name) => {
        this.setState({
            nameProduct: name
        });
    }

    /**
     * Set the new value of the attribute nameProductAlreadyUsed
     * to the error parameter value :
     *                  False = OK; True = ERROR.
     * 
     * @param {boolean} error : value of nameProductAlreadyUsed
     *                          updated. 
     * 
     * @return : none
     */
    updateNameProductAlreadyUsed = (error) => {
        this.setState({
            nameProductAlreadyUsed: error
        });
    }

    /**
     * Update the priceProduct state from the
     * price parameter.
     * 
     * @param {float} price : updated price to set.
     * 
     * @return : none
     */
    updatePriceProduct = (price) => {
        this.setState({
            priceProduct: price
        });
    }

    /**
     * Submit states to the parent component by calling
     * parent's props methods.
     * Call setView props and put INPUT_RECIPE_VIEW parameter
     * to shutdown the view and load the previous view.
     * 
     * @param : none
     * 
     * @return : none
     */
    onSubmitState = () => {
        const { productList } = this.props;
        const { nameProduct, priceProduct } = this.state;

        const newProduct = {
            name: nameProduct,
            price: parseFloat(priceProduct, 10)
        };

        this.props.setProductList([...productList, newProduct]);

        // Add ingredient success message
        Toast.show(nameProduct + " a été ajouté à votre liste de produits !", TOAST_TIMER, "bottom").subscribe(
            toast => {
                console.log(toast);
            }
        );

        this.setState({
            nameProduct: "",
            priceProduct: "",
            nameProductAlreadyUsed: false
        });

        this.inputProductRef.current.focus();
    }

    /**
     * Check if states can be submit to parent component or not.
     * It check if the ingredient price is empty or if its last
     * character is a dot.
     * It also check if the ingredient name is empty or already used.
     * 
     * @param : none
     * 
     * @return {boolean} : boolean of if states can be submit to
     *                     parent component or not.
     */
    canSubmit = () => {
        const { productList } = this.props;
        const { nameProduct, priceProduct } = this.state;

        if (!FormInput.checkName(productList, nameProduct)
            && nameProduct !== ""
            && priceProduct !== ""
            && nameProduct[nameProduct.length - 1] !== " "
            && priceProduct[priceProduct.length - 1] !== ".") {

            return true;
        }

        return false;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { ingredientList, productList, previousView } = this.props;
        const { nameProduct, nameProductAlreadyUsed, priceProduct } = this.state;

        return (
            <React.Fragment>

                <div className="container-2" >

                    <FormInput
                        elementList={ingredientList.concat(productList)} // Use to check if the name is already in use.
                        name={nameProduct}
                        price={priceProduct}
                        error={nameProductAlreadyUsed}
                        inputIngredientRef={this.inputProductRef}
                        setName={this.updateNameProduct}
                        setPriceIngredient={this.updatePriceProduct}
                        setError={this.updateNameProductAlreadyUsed}
                        currentView={INPUT_INGREDIENT_VIEW}
                    >Product</FormInput>

                </div>

                <div className="container-4">

                    <BackButton
                        onClick={this.props.setView}
                        previousView={previousView}
                    />

                    <SubmitButton
                        onClick={this.onSubmitState}
                        canSubmit={this.canSubmit}
                        className={SUBMIT_INGREDIENT_VIEW}
                    >VALIDER</SubmitButton>

                </div>

            </React.Fragment>
        )
    }

}

export default InputProductView;