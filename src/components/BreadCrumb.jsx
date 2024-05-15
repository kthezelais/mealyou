// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/BreadCrumb.css';

// Constants import
import {
    INPUT_DATE_VIEW,
    INPUT_MEAL_VIEW,
    INPUT_RECIPE_VIEW,
    OUTPUT_MEAL_VIEW,
    EDIT_RECIPE_VIEW,
    INPUT_OTHER_VIEW,
    INPUT_PRODUCT_VIEW,
} from '../const';


/**
 * BreadCrumb component allows to go back
 * to previous view.
 */
class BreadCrumb extends Component {

    /**
     * Print JSX from its states and props
     */
    render() {
        const { viewId, previousView } = this.props;

        return (
            <React.Fragment>

                {/*
                    BreadCrumb use to display the user progression
                    by indicate in which step he is.
                */}
                {viewId <= OUTPUT_MEAL_VIEW && viewId !== INPUT_DATE_VIEW &&

                    <ul className="progressbar">
                        <li className={viewId >= INPUT_DATE_VIEW ? "active" : ""}>Dates</li>
                        <li className={viewId >= INPUT_MEAL_VIEW ? "active" : ""}>Repas</li>
                        <li className={viewId >= INPUT_OTHER_VIEW ? "active" : ""}>Produits</li>
                        <li className={viewId >= OUTPUT_MEAL_VIEW ? "active" : ""}>Listes</li>
                    </ul>

                }

                {/*
                    BreadCrumb use to display the user progression
                    by indicate where he is from the step 2.
                */}
                {viewId >= INPUT_RECIPE_VIEW && viewId <= INPUT_PRODUCT_VIEW &&

                    <ul className="progressbar-form-input">
                        <li className="active"></li>
                        
                        {viewId === INPUT_PRODUCT_VIEW && // When the current view is InputProductView
                            <p>Produits {">"} Créer produit</p>
                        }

                        {previousView === undefined && viewId !== INPUT_PRODUCT_VIEW && // When the current view is InputRecipeView
                            <p>Repas {">"} Créer recette</p>
                        }

                        {previousView === INPUT_RECIPE_VIEW && // When the current view is InputRecipeView
                            <p>Repas {">"} Créer recette {">"} Créer ingrédient</p>
                        }

                        {previousView === EDIT_RECIPE_VIEW && // When the current view is EditRecipeView
                            <p>Recettes {">"} Modifier recette {">"} Créer ingrédient</p>
                        }
                    </ul>

                }

                {/*
                    BreadCrumb use to display the user progression
                    by indicate where he is from the step 2 when he
                    is editing its recipes.

                    BreadCrumb has to be different when the current
                    view is InputRecipeView or EditRecipeView.
                */}
                {viewId >= EDIT_RECIPE_VIEW &&

                    <ul className="progressbar-form-input">
                        <li className="active"></li>
                        <p>
                            Recettes {">"} {viewId === EDIT_RECIPE_VIEW && "Modifier recette"}
                        </p>
                    </ul>

                }
            </React.Fragment>
        );
    }
}

BreadCrumb.propTypes = {
    viewId: PropTypes.number.isRequired,
    previousView: PropTypes.number
};

export default BreadCrumb;