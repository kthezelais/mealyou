// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import LineTable from './LineTable';
import PopUp from '../pages/Pop-Ups/PopUp';
import PopUpConfirmation from '../pages/Pop-Ups/PopUpConfirmation';

// Styles import
import '../theme/Table.css';

// Constants import


/**
 * Table class is use to print elements from an array and
 * add / remove / update its.
 */
class Table extends Component {

    /**
     * Constructor of class Table.
     * It generate the checkedElements Array state
     * from  the elementList state size.
     */
    constructor(props) {
        super(props);
        let checkedElements = [];

        for (let i = 0; i < this.props.elementList.length; i++) {
            checkedElements = [...checkedElements, false];
        }

        this.state = {
            checkedElements: checkedElements,
            displayPopUp: false,
            displayPopUpConfirmation: false
        }
    }

    /**
     * Remove all elements of elementList state.
     * Update state and parent state after change.
     * 
     * @param : none
     * 
     * @return : none
     */
    removeAllElements = () => {
        this.setState({
            checkedElements: []
        });
        this.props.updateSelectedPopUpElementList([]);
        this.props.updateElementList([]);
    }

    /**
     * Remove the element of elementList state
     * from its id.
     * Update state and parent state after change.
     * 
     * @param {integer} id : element's id to remove.
     * 
     * @return : none
     */
    removeElementById = (id) => {
        const { elementList, selectedPopUpElementList } = this.props;
        const { checkedElements } = this.state;

        const idElementListToRemove = elementList.findIndex((element) => element.id === id);

        const element = elementList.splice(idElementListToRemove, 1)[0];
        checkedElements.splice(idElementListToRemove, 1);
        selectedPopUpElementList.splice(selectedPopUpElementList.indexOf(element.id), 1);

        this.setState({
            checkedElements: checkedElements
        })

        this.props.updateSelectedPopUpElementList(selectedPopUpElementList);
        this.props.updateElementList(elementList);
    }

    /**
     * Add a list of elements in elementList state and checkedElements
     * state. Also add the element's id into selectedPopUpElementList
     * state.
     * Update state and parent state after change.
     * 
     * @param {object} idElements : element to add in elementList.
     * 
     * @return : none
     */
    addElements = (idElements) => {
        const { elementList, popUpElementList, selectedPopUpElementList } = this.props;
        const { checkedElements } = this.state;

        idElements.map((id) => {
            const element = {
                id: id,
                name: popUpElementList[id].name,
                amount: 1
            };

            checkedElements.push(false);
            selectedPopUpElementList.push(id);
            elementList.push(element);

            return id;
        });

        this.setState({
            checkedElements: checkedElements
        });
        this.props.updateSelectedPopUpElementList(selectedPopUpElementList.sort());
        this.props.updateElementList(elementList);
    }

    /**
     * Modify / Update an existing element in elementList
     * state from its id.
     * Update parent state after change.
     * 
     * @param {object} updatedElement : new state of existing element.
     * 
     * @return : none
     */
    updateElement = (updatedElement) => {
        const { elementList } = this.props;

        this.props.updateElementList(elementList.map((element) => {
            if (element.id === updatedElement.id) {
                return updatedElement;
            } else {
                return element;
            }
        }));
    }

    /**
     * Call parent setView method to init the id
     * of the next view.
     * 
     * @param {integer} idView : view id to init.
     * 
     * @return : none
     */
    setView = (idView) => {
        this.props.setView(idView);
    }

    /**
     * Diplay or undisplay PopUp by toggling displayPopUp state.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUp = () => {
        const { displayPopUp } = this.state;

        this.setState({
            displayPopUp: !displayPopUp
        });
    }

    /**
     * Diplay or undisplay PopUpConfirmation by toggling displayPopUpConfirmation state.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUpConfirmation = () => {
        const { displayPopUpConfirmation } = this.state;

        this.setState({
            displayPopUpConfirmation: !displayPopUpConfirmation
        });
    }

    /**
     * Check / Uncheck element from its id by updating
     * checkedElements state.
     * 
     * @param {integer} id : element's id to update.
     */
    toggleCheckedElementById = (id) => {
        const { checkedElements } = this.state;
        const { elementList } = this.props;

        const idElementListToCheck = elementList.findIndex((element) => element.id === id);

        console.log("idElementListToCheck" + idElementListToCheck);

        const newCheckedElements = checkedElements.map((checked, index) => {
            if (idElementListToCheck === index) {
                return !checked;
            }
            return checked;
        });

        this.setState({
            checkedElements: newCheckedElements
        });
    }

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

Table.propTypes = {
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
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    importDatas: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    nextView: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired
};

export default Table;