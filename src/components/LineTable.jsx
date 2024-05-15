// Libraries import
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components import
import AmountInput from './AmountInput';

// Styles import
import '../theme/LineTable.css';

// Constants import


/**
 * LineTable class is use to print one element from a
 * Table component. It can remove or update it.
 */
class LineTable extends Component {

    /**
     * Call removeElementById props and put
     * it's id props as parameter to indicate to
     * its parent which LineTable component
     * has to be remove.
     * 
     * @param : none
     * 
     * @return : none
     */
    removeElement = () => {
        const { id } = this.props;

        this.props.removeElementById(id);
    }

    /**
     * Call updateElement props and put
     * the update amount on a new element.
     * This updated element will replace the
     * old one.
     * 
     * @param {JSX} e : the JSX element that call
     *                  this method.
     * 
     * @return : none 
     */
    updateElement = (e) => {
        const { id, children } = this.props;
        const amount = e.target.value;

        this.props.updateElement({
            id: id,
            name: children,
            amount: parseInt(amount, 10)
        });
    }

    /**
     * Call toggleCheckedElementById props and put
     * it's id props as parameter to indicate to
     * its parent which LineTable component
     * has to be check.
     * 
     * @param : none
     * 
     * @return : none
     */
    toggleCheckedElementById = () => {
        const { id } = this.props;

        this.props.toggleCheckedElementById(id);
    }

    /**
     * Print JSX from its states and props
     */
    render() {
        const { checked, maxAmount, amount, children } = this.props;

        return (
            <div className="tr">
                <div className="td"><input type="checkbox" checked={checked} onChange={this.toggleCheckedElementById} /></div>
                <div className="td">{children}</div>
                <div className="td">
                    <AmountInput
                        value={amount}
                        onChange={this.updateElement}
                        maxValue={maxAmount}
                    />
                    <button onClick={() => this.removeElement()} className="remove-line-button" ><i className="fas fa-trash"></i></button>
                </div>
            </div>
        )
    }
}

LineTable.propTypes = {
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    maxAmount: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    removeElementById: PropTypes.func.isRequired,
    updateElement: PropTypes.func.isRequired,
    toggleCheckedElementById: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
};

export default LineTable;