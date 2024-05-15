// Imports de librairies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Imports du styles
import '../../theme/PopUpConfirmation.css';

// Constants import


/**
 * PopUpConfirmation class is use to confirm an
 * action before apply.
 */
class PopUpConfirmation extends Component {

    /**
     * Call togglePopUpConfirmation props to shutdown the
     * PopUpConfirmation component.
     * 
     * @param : none
     * 
     * @return : none
     */
    togglePopUpConfirmation = () => {
        this.props.togglePopUpConfirmation();
    }

    /**
     * Call confirmAction use to confirm the action that
     * the PopUpConfirmation is called for and close the
     * PopUpConfirmation component.
     * 
     * @param : none
     * 
     * @return : none
     */
    confirmAction = () => {
        this.props.confirmAction();
        this.togglePopUpConfirmation();
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { title, children } = this.props;

        return (
            <React.Fragment>
                <div className="div-parent-popup-confirmation" onClick={(e) => e.target.className === "div-parent-popup-confirmation" ? this.togglePopUpConfirmation() : null}>
                    <div className="div-popup-confirmation" >

                        {/* #######################################################################################################*/}
                        {/* ############################################# POPUP TITLE #############################################*/}
                        {/* #######################################################################################################*/}

                        <div className="title-popup-confirmation">

                            <p>{title}</p>

                        </div>


                        {/* #######################################################################################################*/}
                        {/* ######################################## POPUP ELEMENTS LISTED ########################################*/}
                        {/* #######################################################################################################*/}

                        <div className="content-popup-confirmation">

                            <p>{children}</p>

                        </div>


                        {/* #######################################################################################################*/}
                        {/* ######################################### POPUP ACTION PANEL ##########################################*/}
                        {/* #######################################################################################################*/}

                        <div className="div-action-popup-confirmation">

                            <div className="div-button-popup">
                                <button className="cancel-button" onClick={() => this.togglePopUpConfirmation()}>ANNULER</button>
                                <button className="confirm-button" onClick={() => this.confirmAction()}>CONFIRMER</button>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment >
        )
    }
}

PopUpConfirmation.propTypes = {
    title: PropTypes.string.isRequired,
    togglePopUpConfirmation: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.string
            ]).isRequired
        )
    ])
};

export default PopUpConfirmation;