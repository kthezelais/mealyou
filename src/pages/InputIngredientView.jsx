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
 * InputIngredientView class is the view which is called from InputRecipeView
 * view if a new ingredient has to be created. It is displayed when App state
 * currentView is set as INPUT_INGREDIENT_VIEW. This view is used to create a
 * new ingredient to add into the ingredientList App state.
 */
class InputIngredientView extends Component {

    /**
     * Constructor of class InputIngredientView.
     */
    constructor(props) {
        super(props);

        this.state = {
            nameIngredient: "",
            priceIngredient: "",
            nameIngredientAlreadyUsed: false
        }

        this.inputIngredientRef = React.createRef(); // Use to focus input text ingredient after submit
    }

    /**
     * Update the nameIngredient state from the
     * name parameter.
     * 
     * @param {string} name : updated name to set.
     * 
     * @return : none
     */
    updateNameIngredient = (name) => {
        this.setState({
            nameIngredient: name
        });
    }

    /**
     * Set the new value of the attribute nameIngredientAlreadyUsed
     * to the error parameter value :
     *                  False = OK; True = ERROR.
     * 
     * @param {boolean} error : value of nameIngredientAlreadyUsed
     *                          updated. 
     * 
     * @return : none
     */
    updateNameIngredientAlreadyUsed = (error) => {
        this.setState({
            nameIngredientAlreadyUsed: error
        });
    }

    /**
     * Update the priceIngredient state from the
     * price parameter.
     * 
     * @param {float} price : updated price to set.
     * 
     * @return : none
     */
    updatePriceIngredient = (price) => {
        this.setState({
            priceIngredient: price
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
        const { ingredientList } = this.props;
        const { nameIngredient, priceIngredient } = this.state;

        const newIngredient = {
            name: nameIngredient,
            price: parseFloat(priceIngredient, 10)
        };

        this.props.setIngredientList([...ingredientList, newIngredient]);

        // Add ingredient success message
        Toast.show(nameIngredient + " a été ajouté à votre liste d'ingrédients !", TOAST_TIMER, "bottom").subscribe(
            toast => {
                console.log(toast);
            }
        );

        this.setState({
            nameIngredient: "",
            priceIngredient: "",
            nameIngredientAlreadyUsed: false
        });

        this.inputIngredientRef.current.focus();
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
        const { ingredientList } = this.props;
        const { nameIngredient, priceIngredient } = this.state;

        if (!FormInput.checkName(ingredientList, nameIngredient)
            && nameIngredient !== ""
            && priceIngredient !== ""
            && nameIngredient[nameIngredient.length - 1] !== " "
            && priceIngredient[priceIngredient.length - 1] !== ".") {
                
            return true;
        }

        return false;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { ingredientList, previousView, productList } = this.props;
        const { nameIngredient, nameIngredientAlreadyUsed, priceIngredient } = this.state;

        return (
            <React.Fragment>

                <div className="container-2" >

                    <FormInput
                        elementList={ingredientList.concat(productList)} // Use to check if the name is already in use.
                        name={nameIngredient}
                        price={priceIngredient}
                        error={nameIngredientAlreadyUsed}
                        inputIngredientRef={this.inputIngredientRef}
                        setName={this.updateNameIngredient}
                        setPriceIngredient={this.updatePriceIngredient}
                        setError={this.updateNameIngredientAlreadyUsed}
                        currentView={INPUT_INGREDIENT_VIEW}
                    />

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

InputIngredientView.propTypes = {
    ingredientList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    setIngredientList: PropTypes.func.isRequired,
    importDatas: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    previousView: PropTypes.number.isRequired,
};

export default InputIngredientView;