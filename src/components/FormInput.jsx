// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/FormInput.css';

// Constants
import {
    INPUT_RECIPE_VIEW,
    INPUT_INGREDIENT_VIEW,
    EDIT_RECIPE_VIEW,
    INPUT_PRODUCT_VIEW
} from '../const';

/**
 * FormInput class is a component use to set a name
 * and a description to elements from its parents
 * props.
 */
class FormInput extends Component {

    /**
     * Check if the name parameter already exists into the
     * elementList parameter or not.
     * Return true or false accordingly.
     * 
     * @param {object} elementList : the list of elements
     *                               used to check if the
     *                               inputed name is
     *                               available or not.
     * 
     * @param {string} name : the inputed name to check.
     * 
     * @return {boolean} : error value.
     */
    static checkName(elementList, name) {

        console.log(JSON.stringify(elementList, null, 4));

        for (let i = 0; i < elementList.length; i++) {
            if (elementList[i].name.toUpperCase() === name.toUpperCase()) {
                return true;
            }
        }

        return false;
    }

    /**
     * Set the name from inputed value on e
     * parameter.
     * 
     * @param {JSX} e : JSX element name.
     * 
     * @return : none
     */
    setName = (e) => {
        const name = e.target.value;

        this.props.setName(name.trimStart());
    }

    /**
     * Set the description from inputed value on
     * e parameter.
     * 
     * @param {JSX} e : JSX element description.
     * 
     * @return : none
     */
    setDescription = (e) => {
        const description = e.target.value;

        this.props.setDescription(description);
    }

    /**
     * Set the price from inputed value on e 
     * e parameter.
     * 
     * @param {JSX} e : JSX element prixe.
     * 
     * @return : none
     */
    setPrice = (e) => {
        const price = e.target.value;

        var decimal = /^(\d+\.?\d{0,2}|\.\d{1,9}|)$/;

        if (price.match(decimal)) {
            this.props.setPriceIngredient(price);
        }
    }

    /**
     * Return the error message to display from the error and
     * input values.
     * 
     * @param {boolean} error : the error return by the checkName
     *                          method.*
     * 
     * @param {boolean} input : the input string use to check if
     *                          end space is detected.
     * 
     * @return {string} : the error message to display.
     */
    errorMsg = (error, input) => {
        const { currentView } = this.props;

        if (error) {
            if (currentView === INPUT_RECIPE_VIEW) {
                return "Ce nom de recette est déjà utilisé.";
            
            } else if (currentView === INPUT_INGREDIENT_VIEW || currentView === INPUT_PRODUCT_VIEW) {
                return "Ce nom d'ingrédient ou de produit est déjà utilisé";

            } else if (currentView === EDIT_RECIPE_VIEW) {
                return "Ce nom est déjà utilisé.";

            }
        } else if (input[input.length - 1] === " ") {
            return "Effacer les espaces en fin de saisie";
        }

        return null;
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { elementList, id, name, description, price, currentView, inputIngredientRef } = this.props;
        let error = null;

        if (id !== undefined) {
            const editRecipeList = elementList.map((element) => {
                return element;
            });

            editRecipeList.splice(id, 1);

            error = FormInput.checkName(editRecipeList, name);
        } else {
            error = FormInput.checkName(elementList, name);
        }

        return (
            <div className="div-form">

                {/* #######################################################################################################*/}
                {/* ############################################# NAME ELEMENT ############################################*/}
                {/* #######################################################################################################*/}

                <label
                    className={(!error && name[name.length - 1] !== " ") || name === "" ? "label-input-name" : "label-input-name-error"}
                    htmlFor="input-name"
                >Nom {this.props.children === undefined ? (currentView === INPUT_RECIPE_VIEW ? "de la recette" : "de l'ingrédient") : "du produit"}</label>

                <input
                    className={(!error && name[name.length - 1] !== " ") || name === "" ? "input-name" : "input-name-error"}
                    type="text"
                    placeholder="Nouvelle recette"
                    name="input-name"
                    ref={inputIngredientRef}
                    onChange={this.setName}
                    value={name}
                />

                {name !== "" &&
                    <span
                        className="error-msg"
                    >{this.errorMsg(error, name)}</span>
                }

                {(currentView === INPUT_RECIPE_VIEW || currentView === EDIT_RECIPE_VIEW) &&
                    /* ####################################################################################################### */
                    /* ######################################### DESCRIPTION ELEMENT ######################################### */
                    /* ####################################################################################################### */

                    <React.Fragment>

                        <label
                            className="label-input-description-recipe"
                            htmlFor="input-name"
                        >Description de la recette</label>

                        <textarea
                            className="input-description-recipe"
                            placeholder="Description de ma super nouvelle recette !"
                            onChange={this.setDescription}
                            value={description}
                        ></textarea>

                    </React.Fragment>

                }

                {currentView === INPUT_INGREDIENT_VIEW &&
                    /* ####################################################################################################### */
                    /* ############################################ PRICE ELEMENT ############################################ */
                    /* ####################################################################################################### */

                    <React.Fragment>

                        <label
                            className="label-input-price-ingredient"
                            htmlFor="input-price-ingredient"
                        >Prix {this.props.children === undefined ? "de l'ingrédient" : "du produit"}</label>

                        <input
                            className="input-price-ingredient"
                            type="text"
                            placeholder="0.00 €"
                            name="input-price-ingredient"
                            onChange={this.setPrice}
                            value={price}
                        />

                    </React.Fragment>
                }

            </div>
        );
    }
}

FormInput.propTypes = {
    elementList: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired
    ).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
    description: PropTypes.string,
    error: PropTypes.bool.isRequired,
    currentView: PropTypes.number.isRequired,
    setName: PropTypes.func.isRequired,
    setDescription: PropTypes.func,
    setError: PropTypes.func.isRequired
};

export default FormInput;