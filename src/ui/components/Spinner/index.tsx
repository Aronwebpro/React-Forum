import * as React from 'react';
import * as PropTypes from 'prop-types';

// Styles
import './spinner.css';

// Spin image
import img from './img/spinner.gif';

// @types
type Props = {
    size: string
    screenWidth: boolean
}

export default class Spinner extends React.PureComponent<Props, {}> {
    public static propTypes = {
        size: PropTypes.string,
        screenWidth: PropTypes.bool,
    };

    public static defaultProps = {
        size: 'normal',
    };

    public render() {
        const {
            screenWidth
        } = this.props;
        return (
            <div className={`page-spinner-container ${screenWidth ? 'width-vw' : 'width-cw'}`}>
                <div className="page-spinner-wrapper" style={this.handleSpinnerSize()}>
                    <img src={img} alt="Spinner" id="page-spinner-img"/>
                </div>
            </div>
        )
    }

    private handleSpinnerSize = () => {
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
