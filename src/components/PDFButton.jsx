// Librairies import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import


// Styles import
import '../theme/PDFButton.css';

// Constants import


/**
 * PDFButton class is a basic button
 * with a specific css style used to
 * download PDF file.
 */
class PDFButton extends Component {

    /**
     * Print JSX from its states and props
     */
    render() {
        const { children } = this.props;

        return (
            <button
                className="button-download-pdf"
                onClick={() => this.props.onClick()}
            >{children}</button>
        );
    }
}

PDFButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default PDFButton;