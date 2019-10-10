import * as React from 'react';
import * as PropTypes from 'prop-types';

//Styles
import './switcher.css';

//@types
type Props = {
    checked: boolean
    handleCheck: () => void
}

export default class Switcher extends React.PureComponent<Props, {}> {
    public static propTypes = {
        checked: PropTypes.bool.isRequired,
        handleCheck: PropTypes.func.isRequired,
    };

    public render() {
        const {checked, handleCheck} = this.props;
        return (
            <div
                className={`switcher ${checked && 'switcherChecked'}`}
                onClick={handleCheck}
            />
        )
    }
}
