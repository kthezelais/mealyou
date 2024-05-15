// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from 'json-schema';
import { IonButton } from '@ionic/react';
import { Toast } from '@ionic-native/toast';

// Components import


// Styles import
import '../theme/ImportButton.css';

// Constants
import {
    INPUT_MEAL_VIEW,
    JSON_FILE_SCHEMA,
    TOAST_TIMER
} from '../const';

/**
 * ImportButton class is use to import recipes and
 * ingredients list from a JSON file.
 * It also check the data structure of the file
 * before loading.
 */
class ImportButton extends Component {

    /**
     * Constructor of class ImportButton.
     */
    constructor(props) {
        super(props);

        this.inputFile = React.createRef();
    }

    /**
     * Call the click event on the inputFile
     * reference.
     * 
     * @param : none
     * 
     * @return : none
     */
    onButtonClick = () => {
        // Provoc click event on input file button
        this.inputFile.current.click();
    }

    /**
     * Call when a file is import from the input
     * file HTML button.
     * It loads the file, close the PopUp component
     * and call the importDatas method.
     * 
     * @param {JSX} e : input file JSX element.
     * 
     * @return : none
     */
    handleFileChange = (e) => {
        const file = e.target.files[0];
        
        
        try {
            this.props.togglePopUp();
        } catch (error) {
            console.log("[LOG] this.props.togglePopUp() is not a function : ImportButton probably not in a PopUp.");
        }

        this.importDatas(file);
    }

    /**
     * Import recipes and ingredients list from a JSON
     * file into the app.
     * It check if the JSON file structure to find
     * if the file is corrupt or not before import and
     * check if the ingredient ids into recipeList is
     * smaller or equals to a maxId to prevent errors.
     * File import is effective accordingly.
     * 
     * @param {object} file : file object to read.
     * 
     * @return : none
     */
    importDatas = (file) => {
        let reader = new FileReader();

        reader.readAsText(file, "UTF-8");

        // Display load spinner
        reader.onloadstart = (e) => {
            this.props.inLoadRef.current.style.display = "block";
        }

        // Undisplay load spinner
        reader.onloadend = (e) => {
            this.props.inLoadRef.current.style.display = "none";
        }

        // Check JSON File content
        reader.onload = (e) => {
            try {
                const result = JSON.parse(e.target.result);

                const validation = validate(
                    result,
                    JSON_FILE_SCHEMA
                );

                if (validation.valid === true) {
                    // Maximun ID that ingredients can have in recipeList
                    const maxId = result.ingredientList.length - 1;

                    for (let i = 0; i < result.recipeList.length; i++) {
                        const recipe = result.recipeList[i];

                        for (let j = 0; j < recipe.ingredients.length; j++) {
                            const ingredient = recipe.ingredients[j];

                            if (parseInt(ingredient.id) > maxId) {
                                console.log({
                                    valid: false,
                                    errors: [{
                                        property: "recipeList[" + i + "].ingredients[" + j + "].id",
                                        message: "must be smaller than " + maxId
                                    }]
                                });

                                // Error message
                                Toast.show("Echec de l'importation : fichier erroné", TOAST_TIMER, "bottom").subscribe(
                                    toast => {
                                        console.log(toast);
                                    }
                                );

                                return null;
                            }
                        }
                    }
                } else {
                    console.log(validation);

                    // Error message
                    Toast.show("Echec de l'importation : fichier erroné", TOAST_TIMER, "bottom").subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );

                    return null;
                }

                this.props.importDatas(JSON.parse(e.target.result));

                // Error message
                Toast.show("Recettes importées avec succès !", TOAST_TIMER, "bottom").subscribe(
                    toast => {
                        console.log(toast);
                    }
                );

            } catch (error) {
                
                // Display message when an error as occured
                Toast.show("Echec de l'importation : fichier erroné", TOAST_TIMER, "bottom").subscribe(
                    toast => {
                        console.log(toast);
                    }
                );

                return null;
            }
        }

        this.props.setView(INPUT_MEAL_VIEW);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        return (
            <React.Fragment>
                <input
                    ref={this.inputFile}
                    hidden
                    type="file"
                    onChange={this.handleFileChange}
                />

                <div
                    className="button-element-list-is-empty">
                    <div>La liste est vide...</div>

                    <button
                        className="ion-button-import-element"
                        onClick={() => {
                            this.inputFile?.current?.click();
                        }}>

                        <div><i className="fas fa-upload"></i></div>

                    </button>

                    <div>
                        Cliquez ici pour importer vos recettes et ingrédients !
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

ImportButton.propTypes = {
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    importDatas: PropTypes.func.isRequired,
    togglePopUp: PropTypes.func,
    setView: PropTypes.func.isRequired
};

export default ImportButton;