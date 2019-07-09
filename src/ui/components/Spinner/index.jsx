import React from 'react';
import PropTypes from 'prop-types';
//Styles
import './spinner.css';
//Img
import img from './img/spinner.gif';

export default class Spinner extends React.PureComponent {
    render() {

        return (
            <div className="page-spinner">
                <div className="page-spinner-wrapper" style={this.handleSpinnerSize()}>
                    <img src={img} alt="Spinner" id="page-spinner-img"/>
                </div>
            </div>
        )
    }

    handleSpinnerSize = () => {
        const {size} = this.props;
        switch (size) {
            case 'normal' :
                return {height: 'auto', width: '50px'};
            case 'small' :
                return {height: 'auto', width: '35px'};
            default :
                return {height: 'auto', width: '50px'};
        }

    }
}

Spinner.propTypes = {
    size: PropTypes.string,
};

Spinner.defaultProps = {
    size: 'normal',
}