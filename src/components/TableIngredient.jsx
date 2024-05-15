// Libraries import
import React from 'react';
import PropTypes from 'prop-types';

// Components import
import Table from './Table';
import LineTable from './LineTable';
import PopUp from '../pages/Pop-Ups/PopUp';
import PopUpConfirmation from '../pages/Pop-Ups/PopUpConfirmation';

// Styles import
import '../theme/Table.css';

/**
 * TableIngredient class an extension of Table class.
 * Its only an adaptation of the render method used by
 * InputRecipeView and EditRecipeView.
 */
class TableIngredient extends Table {

    /**
     * Print JSX from its states and props
     */
    render() {
        const { maxElementAmount, elementList, popUpElementList, selectedPopUpElementList,
            nextView, canImport, children } = this.props;
        const { displayPopUp, displayPopUpConfirmation, checkedElements } = this.state;

        return (
            <React.Fragment>
                {/* #######################################################################################################*/}
                {/* ############################################ TABLE HEADERS ############################################*/}
                {/* #######################################################################################################*/}

                <div className="container-bis">

                    <div className="thead">
                        <div className="tr">
                            <div className="td"><button className="remove-checked-button" onClick={() => this.togglePopUpConfirmation()} disabled={elementList.length > 0 ? "" : "none"} >SUPPRIMER</button></div>

                            <div className="td">
                                <p>{children}</p>

                                {!displayPopUp && // Display add meal button if displayPopUp state is false
                                    <div className="div-add-new-button">
                                        <button className="add-new-button" onClick={() => this.togglePopUp()}>+</button>
                                    </div>
                                }
                            </div>


                        </div>
                    </div>


                    {/* #######################################################################################################*/}
                    {/* ############################################ TABLE CONTENT ############################################*/}
                    {/* #######################################################################################################*/}

                    {/**
                     * elementList === mealList
                     * popUpElementList === recipeList
                     */}

                    <div className={"table-" + nextView}>
                        {elementList.length > 0 &&
                            <div className="tbody">
                                {elementList.map((element, index) => {
                                    return (
                                        <LineTable
                                            key={index}
                                            id={element.id}
                                            checked={checkedElements[index]}
                                            maxAmount={maxElementAmount}
                                            amount={element.amount}
                                            removeElementById={this.removeElementById}
                                            updateElement={this.updateElement}
                                            toggleCheckedElementById={this.toggleCheckedElementById}
                                        >{element.name}</LineTable>
                                    )
                                })}
                            </div>
                        }
                    </div>

                </div>

                {/* #######################################################################################################*/}
                {/* ############################################ POPUP MANAGER ############################################*/}
                {/* #######################################################################################################*/}

                {displayPopUp && // Display PopUp if displayPopUp state is true
                    <PopUp
                        elementList={popUpElementList}
                        selectedElementList={selectedPopUpElementList}
                        canImport={canImport}
                        togglePopUp={this.togglePopUp}
                        addElements={this.addElements}
                        inLoadRef={this.props.inLoadRef}
                        importDatas={this.props.importDatas}
                        setView={this.setView}
                        setViewImport={this.props.setViewImport}
                        nextView={nextView}
                    />
                }

                {displayPopUpConfirmation && // Display PopUpConfirmation if displayPopUpConfirmation state is true
                    <PopUpConfirmation
                        title="Confirmer la suppression"
                        togglePopUpConfirmation={this.togglePopUpConfirmation}
                        confirmAction={this.removeAllElements}
                    >Voulez-vous vraiment effacer votre sélection ?</PopUpConfirmation>
                }

            </React.Fragment>
        )
    }
}

TableIngredient.propTypes = {
    elementList: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired
    ).isRequired,
    popUpElementList: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired
    ).isRequired,
    selectedPopUpElementList: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    maxElementAmount: PropTypes.number.isRequired,
    canImport: PropTypes.bool.isRequired,
    updateElementList: PropTypes.func.isRequired,
    updateSelectedPopUpElementList: PropTypes.func.isRequired,
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    importDatas: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    nextView: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired
};

export default TableIngredient;