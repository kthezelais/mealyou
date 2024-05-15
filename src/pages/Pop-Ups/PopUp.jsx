// Imports de librairies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Imports du styles
import '../../theme/PopUp.css';

// Components import
import ImportButton from '../../components/ImportButton';
import LinePopUp from './LinePopUp';
import SearchBar from '../../components/SearchBar';

/**
 * PopUp class is use to display a list of elements
 * which can be chosen. If an element is selected,
 * the PopUp will not display it next time.
 * This element must be remove in the selected
 * element list to be displayed again.
 */
class PopUp extends Component {

    /**
     * Constructor of class PopUp.
     */
    constructor(props) {
        super(props);
        let checkedElements = [];

        for (let i = 0; i < this.props.elementList.length; i++) {
            checkedElements = [...checkedElements, false];
        }

        this.state = {
            checkedElements: checkedElements,
            keyword: ""
        }
    }

    /**
     * Update keyword's value when input search bar
     * content change.
     * 
     * @param {JSX} e : the input search element.
     * 
     * @return : none
     */
    handleKeyword = (e) => {
        const value = e.target.value;

        this.setState({
            keyword: value
        });
    }

    /**
     * Remove inputed keyword by updating state
     * keyword.
     * 
     * @param : none
     * 
     * @return : none
     */
    removeKeyword = () => {
        this.setState({
            keyword: ""
        });
    }

    /**
     * Check / Uncheck element from its id by updating
     * checkedElements state.
     * 
     * @param {integer} id : element's id to update.
     * 
     * @return : none
     */
    toggleCheckedElementById = (id) => {
        const { checkedElements } = this.state;

        const newCheckedElements = checkedElements.map((checked, index) => {
            if (id === index) {
                return !checked;
            }
            return checked;
        });

        this.setState({
            checkedElements: newCheckedElements
        });
    }

    /**
     * Call addElements props and convert checkedElements state
     * into a list of id to add in the checked element list.
     * It ends by shutting down the PopUp component.
     * 
     * @param : none
     * 
     * @return : none
     */
    addElements = () => {
        const { checkedElements } = this.state;

        const idElements = [];

        for (let i = 0; i < checkedElements.length; i++) {
            if (checkedElements[i]) {
                idElements.push(i);
            }
        }

        if (idElements.length > 0) {
            this.props.addElements(idElements);
            this.togglePopUp();
        }
    }

    /**
     * Call setView props and put nextView props
     * as parameter to load the next view.
     * 
     * @param : none
     * 
     * @return : none
     */
    nextView = () => {
        const { nextView } = this.props;

        this.props.setView(nextView);
    }

    /**
     * Call togglePopUp props to shutdown the
     * PopUp component.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUp = () => {
        this.props.togglePopUp();
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { checkedElements, keyword } = this.state;
        const { elementList, selectedElementList, canImport } = this.props;
        let elementFind = false;

        return (
            <React.Fragment>
                <div className="div-parent-add-element-popup" onClick={(e) => e.target.className === "div-parent-add-element-popup" ? this.togglePopUp() : null}>
                    <div className="div-add-element-popup" >

                        {/* #######################################################################################################*/}
                        {/* ############################################# POPUP TITLE #############################################*/}
                        {/* #######################################################################################################*/}

                        <div className="title-add-element-popup">

                            <p>Sélectionner un élément</p>

                        </div>


                        {/* #######################################################################################################*/}
                        {/* ######################################## POPUP ELEMENTS LISTED ########################################*/}
                        {/* #######################################################################################################*/}

                        {!canImport &&

                            <SearchBar
                                onChange={this.handleKeyword}
                                removeKeyword={this.removeKeyword}
                                keyword={keyword}
                            />

                        }

                        <div className="element-list">

                            {elementList.map((element, index) => {
                                if (selectedElementList.find(idElement => idElement === index) === undefined) {
                                    if (element.name.toUpperCase().includes(keyword.toUpperCase())) {
                                        elementFind = true;

                                        return (
                                            <LinePopUp
                                                key={index}
                                                id={index}
                                                checked={checkedElements[index]}
                                                toggleCheckedElementById={this.toggleCheckedElementById}
                                            >{element.name}</LinePopUp>
                                        )

                                    } else {
                                        return null;
                                    }
                                }

                                return null;
                            })}

                            {canImport &&

                                <ImportButton
                                    inLoadRef={this.props.inLoadRef}
                                    importDatas={this.props.importDatas}
                                    togglePopUp={this.togglePopUp}
                                    setView={this.props.setViewImport}
                                />

                            }

                            {!elementFind && !canImport &&
                                <p>Aucun élément à afficher</p>
                            }

                        </div>


                        {/* #######################################################################################################*/}
                        {/* ######################################### POPUP ACTION PANEL ##########################################*/}
                        {/* #######################################################################################################*/}

                        <div className="div-action-add-element-popup">
                            <button className="add-element-popup-button" onClick={() => this.nextView()}>+</button>

                            <div className="div-text-button">
                                <button className="cancel-button" onClick={() => this.togglePopUp()}>ANNULER</button>
                                <button className="validate-button" onClick={() => this.addElements()}>VALIDER</button>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment >
        )
    }
}

PopUp.propTypes = {
    elementList: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired
    ).isRequired,
    selectedElementList: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    canImport: PropTypes.bool.isRequired,
    togglePopUp: PropTypes.func.isRequired,
    addElements: PropTypes.func.isRequired,
    inLoadRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    importDatas: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    nextView: PropTypes.number.isRequired
};

export default PopUp;