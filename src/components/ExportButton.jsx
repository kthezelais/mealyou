// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AndroidPermissions } from '@ionic-native/android-permissions';

// Components import


// Styles import
import '../theme/ExportButton.css';

// Constants import
import {
    TOAST_TIMER
} from '../const';

/**
 * ExportButton class is use to export recipes and
 * ingredients list inputed into a JSON file.
 * This file can be imported after to reload recipes
 * and ingredients list.
 */
class ExportButton extends Component {

    /**
     * Share your recipes, ingredients and products list.
     * 
     * @param : none
     * 
     * @return : none
     */
    shareJSONFile = async () => {
        const { ingredientList, recipeList, productList } = this.props;
        const JSONObject = { ingredientList: ingredientList, recipeList: recipeList, productList: productList };
        const fileName = "meal-you.json";

        // file:///data/user/0/io.ionic.listedecourses/files/
        console.log("Chemin du fichier : " + File.dataDirectory);

        // File.writeFile(File.externalRootDirectory + 'Download/', fileName, JSON.stringify(JSONObject, null, 4), { replace: true });
        File.writeFile(File.dataDirectory, fileName, JSON.stringify(JSONObject, null, 4), { replace: true });

        SocialSharing.share("", null, File.dataDirectory + fileName, null);
    }

    /**
     * Save recipes, ingredients and products list into a JSON file
     * called "meal-you_hh-mm-ss_DD-MM-YYYY.json".
     * 
     * @param : none
     * 
     * @return : none
     */
    saveJSONFile = async () => {
        const { ingredientList, recipeList, productList } = this.props;
        const JSONObject = { ingredientList: ingredientList, recipeList: recipeList, productList: productList };
        const path = File.externalRootDirectory + 'Download/'; // for Android
        const today = new Date();
        const fileName = "meal-you_" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds() + "_" + today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear() + ".json";

        File.writeFile(path, fileName, JSON.stringify(JSONObject, null, 4), { replace: true })
            .then(() => {
                Toast.show("Fichier exporté avec succès dans vos Téléchargements !", TOAST_TIMER, "bottom").subscribe(
                    toast => {
                        console.log(toast);
                    }
                );
            }, (err) => {
                console.log("[ERROR] An error occured when downloading JSON file : " + JSON.stringify(err, null, 4));
                Toast.show("Une erreur est survenue lors de l'exportation...", TOAST_TIMER, "bottom").subscribe(
                    toast => {
                        console.log(toast);
                    }
                );
            });
    }

    /**
     * Check if the app has all permission to read
     * and write on Download folder on device.
     * If not, it sends the request to get all
     * permissions needed and call saveJSONFile
     * method.
     * 
     * @param : none
     * 
     * @return : none
     */
    checkPermissions() {
        AndroidPermissions.hasPermission(AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
            .then(status => {
                if (status.hasPermission) {
                    this.saveJSONFile();
                } else {
                    AndroidPermissions.requestPermissions([
                        AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                        AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
                    ])
                        .then(status => {
                            if (status.hasPermission) {
                                this.saveJSONFile();
                            }
                        });
                }
            });
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { ingredientList, className, children } = this.props

        return (
            <div className={className} onClick={() => {
                if (ingredientList.length > 0) {
                    this.checkPermissions()
                } else {
                    Toast.show("Votre liste de recettes et/ou d'ingrédients et/ou de produits est vide !", TOAST_TIMER, "bottom").subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );
                }
            }}>
                {children}
            </div>
        );
    }
}

ExportButton.propTypes = {
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
    className: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default ExportButton;