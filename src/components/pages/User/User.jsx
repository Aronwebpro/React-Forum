import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
//User Messages
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../utils/FlashMessageHandler';


export default class User extends React.Component {
    state = {
        posts: [],
        categories: [],
        redirect: false,
        flashMessage: {},
        displayFlashMessage: false,
        hideLoadBtn: true,
        amount: 10,
        empty: false,
        postsLoading: false,
    };

    render() {
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                {this.displayFlashMessageIfItSet()}


            </div>
        )
    }

    async componentDidMount() {

    }


    componentWillUnmount() {
        this.isUnmount = true;
        window.removeEventListener('load', this.setHeight);
    }



    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                if(!this.isUnmount) {
                    this.setState({displayFlashMessage: false});
                }
                FlashMessageHandler.reset();
            }, 2500);
            return <FlashMessage {...this.state.flashMessage} />
        }
    };
}

User.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
