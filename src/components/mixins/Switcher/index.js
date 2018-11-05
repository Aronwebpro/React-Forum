import React from 'react';
import PropTypes from 'prop-types';
//Styles
import './switcher.css';

export default class Switcher extends React.PureComponent {
    render() {
        const {checked, handleCheck} = this.props;
        return (
            <div
                className={`switcher ${checked && 'switcherChecked'}`}
                onClick={handleCheck}
            />
        )
    }
}

Switcher.propTypes = {
    checked: PropTypes.bool.isRequired,
    handleCheck: PropTypes.func.isRequired,
};