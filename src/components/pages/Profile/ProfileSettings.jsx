import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Switch, Route} from 'react-router-dom';
//User Messages
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../utils/FlashMessageHandler';
//Api
import {getPosts, getPostByCategory, getCategories} from '../../../api/lookups.js';

export default class ProfileSettings extends React.Component {
    state = {
        redirect: false
    };

    render() {
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div>
                    Settings Component
                </div>

            </div>
        )
    }

    async componentDidMount() {

    }

    componentWillUnmount() {
        this.isUnmount = true;
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

ProfileSettings.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
