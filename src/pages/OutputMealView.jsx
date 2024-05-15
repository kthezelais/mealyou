// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../fonts/OpenSans-Regular-normal';

// Components import
import BackButton from '../components/BackButton';
import PDFButton from '../components/PDFButton';

// Constants import
import {
    INPUT_OTHER_VIEW,
    LIMIT_LINE_MEAL_PDF,
    LIMIT_LINE_SHOPPING_PDF
} from '../const';


/**
 * OutputMealView class is used to create PDF files from
 * states of App component. You can have the shopping list
 * or the meals list from the previous view.
 */
class OutputMealView extends Component {

    /**
     * Return a shopping list in PDF format from
     * its props.
     * 
     * @param : none
     * 
     * @return : none
     */
    shoppingListPDF = () => {
        const { mealList, ingredientList, recipeList, products, productList } = this.props;
        let shoppingList = [];
        let tableLeft;
        let tableRight;
        const fileName = "liste-de-courses.pdf";
        const doc = new jsPDF();

        doc.setFont('OpenSans-Regular', 'normal');

        // Generate tables elements
        for (let i = 0; i < mealList.length; i++) {
            const meal = recipeList[mealList[i].id];

            for (let j = 0; j < meal.ingredients.length; j++) {
                const ingredient = ingredientList[meal.ingredients[j].id];
                const amount = meal.ingredients[j].amount;
                let alreadyPush = false;

                const updateShoppingList = shoppingList.map((element) => {
                    if (element[1] === ingredient.name) {
                        alreadyPush = true;

                        return [element[0], element[1], element[2] + (amount * mealList[i].amount), element[3]];
                    }

                    return element;
                });

                if (alreadyPush) {
                    shoppingList = updateShoppingList;
                } else {
                    shoppingList.push(['', ingredient.name, amount * mealList[i].amount, ingredient.price.toFixed(2)]);
                }
            }
        }

        // Add products list into the shopping list
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            shoppingList.push(['', product.name, product.amount, productList[product.id].price.toFixed(2)]);
        }

        let shoppingListAdapted;
        
        for (let i = 0; i < shoppingList.length / LIMIT_LINE_SHOPPING_PDF; i++) {
            if (shoppingList.length / LIMIT_LINE_SHOPPING_PDF > 1) {
                shoppingListAdapted = shoppingList.slice(i * LIMIT_LINE_SHOPPING_PDF, (i + 1) * LIMIT_LINE_SHOPPING_PDF);
            } else {
                shoppingListAdapted = shoppingList;
            }

            // Adapt the element amount in each table
            if (shoppingList.length % 2 === 0) {
                tableLeft = shoppingListAdapted.slice(0, (shoppingListAdapted.length / 2));
                tableRight = shoppingListAdapted.slice((shoppingListAdapted.length / 2), shoppingListAdapted.length);
            } else {
                tableLeft = shoppingListAdapted.slice(0, (shoppingListAdapted.length / 2));
                tableRight = shoppingListAdapted.slice((shoppingListAdapted.length / 2), shoppingListAdapted.length + 1);
            }

            // Title of the PDF file
            doc.autoTable({
                startY: 5,
                theme: 'plain',
                body: [
                    [{ content: 'Liste de courses', colSpan: 2, rowSpan: 2, styles: { halign: 'center', fontSize: 20, font: 'OpenSans-Regular' } }]
                ],
            });
    
            // Left table of elements
            doc.autoTable({
                startY: 20,
                styles: { overflow: 'hidden', font: 'OpenSans-Regular' },
                margin: { right: 107 },
                lineWidth: 1,
                theme: 'grid',
                head: [['X', 'Ingrédient', 'Quantité', 'Prix (Euros)']],
                body: tableLeft,
            });
    
            // Right table of elements
            doc.autoTable({
                startY: 20,
                styles: { overflow: 'hidden', font: 'OpenSans-Regular' },
                margin: { left: 107 },
                theme: 'grid',
                head: [['X', 'Ingrédient', 'Quantité', 'Prix']],
                body: tableRight,
            });

            if (i + 1 < shoppingList.length / LIMIT_LINE_SHOPPING_PDF) {
                doc.addPage();
            }
        }

        // Save the generated PDF file
        File.writeFile(File.dataDirectory, fileName, doc.output(), { replace: true });

        // Share the generated PDF file
        SocialSharing.share("", null, File.dataDirectory + fileName, null).then(() => {
            console.log("[SUCCESS] PDF shoppingList has been shared with success !");

        }, (err) => {
            console.log("[ERROR] An error occured when sharing PDF shoppingList : " + JSON.stringify(err, null, 4));

        });
    }

    /**
     * Return a meals list in PDF format from
     * its props.
     * 
     * @param : none
     * 
     * @return : none
     */
    mealListPDF = () => {
        const { mealList } = this.props;
        const fileName = "liste-des-repas.pdf";
        const doc = new jsPDF();

        doc.setFont('OpenSans-Regular', 'normal');

        var lineHeight = 15;
        var squareSpace = 15;

        let line = 0;

        for (let i = 0; i < mealList.length; i++) {
            const meal = mealList[i];
            let nbCheckedLineMeal = 0;

            if (line > LIMIT_LINE_MEAL_PDF) {
                doc.addPage();
                lineHeight = 15;
                squareSpace = 15;
                line = 0;
            }

            if (meal.name.length > 30) {
                doc.text(meal.name.slice(0, 30) + '...', 10, 16 + lineHeight * line);

            } else {
                doc.text(meal.name, 10, 16 + lineHeight * line);

            }

            doc.rect(100, 10 + lineHeight * line, 10, 10); // empty square

            nbCheckedLineMeal++;

            for (let j = 0; j < (meal.amount - 1); j++) {
                if (nbCheckedLineMeal !== 0 && nbCheckedLineMeal === 7) {
                    line++;
                    nbCheckedLineMeal = 0;
                    
                    if (line > LIMIT_LINE_MEAL_PDF) {
                        doc.addPage();
                        lineHeight = 15;
                        squareSpace = 15;
                        line = 0;
                    }
                }

                doc.rect(100 + squareSpace * nbCheckedLineMeal, 10 + lineHeight * line, 10, 10); // empty square
                nbCheckedLineMeal++;
            }

            line++;
            doc.line(10, 10 + lineHeight * line, 200, 10 + lineHeight * line); // horizontal line
            line = line + 0.3;
        }

        // Save the generated PDF file
        File.writeFile(File.dataDirectory, fileName, doc.output(), { replace: true });

        // Share the generated PDF file
        SocialSharing.share("", null, File.dataDirectory + fileName, null).then(() => {
            console.log("[SUCCESS] PDF shoppingList has been shared with success !");

        }, (err) => {
            console.log("[ERROR] An error occured when sharing PDF mealist : " + JSON.stringify(err, null, 4));

        });
    }

    /**
     * Share your recipes and ingredients list.
     * 
     * @param : none
     * 
     * @return : none
     */
    shareJSONFile = async () => {
        const { ingredientList, recipeList } = this.props;
        const JSONObject = { ingredientList: ingredientList, recipeList: recipeList }
        const fileName = "liste-de-courses.json";

        // file:///data/user/0/io.ionic.listedecourses/files/
        console.log("Chemin du fichier : " + File.dataDirectory);

        // File.writeFile(File.externalRootDirectory + 'Download/', fileName, JSON.stringify(JSONObject, null, 4), { replace: true });
        File.writeFile(File.dataDirectory, fileName, JSON.stringify(JSONObject, null, 4), { replace: true });

        SocialSharing.share("", null, File.dataDirectory + fileName, null);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        return (
            <React.Fragment>
                <div className="container-3">

                    {/**
                     * Button use to download the shopping list
                     */}
                    <PDFButton
                        onClick={this.shoppingListPDF}
                    >

                        <div><i className="fas fa-cart-arrow-down"></i></div>
                        <div>Liste de courses</div>

                    </PDFButton>

                    {/**
                     * Button use to download the meals list
                     */}
                    <PDFButton
                        onClick={this.mealListPDF}
                    >

                        <div><i className="fas fa-drumstick-bite"></i></div>
                        <div>Liste des repas</div>

                    </PDFButton>

                    <BackButton
                        onClick={this.props.setView}
                        previousView={INPUT_OTHER_VIEW}
                    />

                </div>


            </React.Fragment>
        );
    }
}

OutputMealView.propTypes = {
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
    setView: PropTypes.func.isRequired
};

export default OutputMealView;