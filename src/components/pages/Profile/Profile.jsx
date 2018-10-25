import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
//User Messages
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../utils/FlashMessageHandler';
//Styles
import './profile.css';
//Utils
import {formatToDateAndTimeString} from '../../../utils';

export default class Profile extends React.Component {
    state = {
        redirect: false,
        loading: false,
    };

    render() {
        const {redirect} = this.state;
        const {user} = this.props;
        const {authorAvatar, authorName} = user || {};
        return redirect ? (
            <Redirect to="/"/>
            ) : (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Profile</h2>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-wrapper">
                            <h2>User Information:</h2>
                            <div className="user-info-row">
                                <div className="user-info-left">
                                    <ul>
                                        <li>Nick Name:</li>
                                        <li>Email Address:</li>
                                        <li>Created:</li>
                                        <li>Topics Number:</li>
                                        <li>Comments Number:</li>
                                    </ul>
                                </div>
                                <div className="user-info-right">
                                    <ul>
                                        <li>{authorName}</li>
                                        <li>useremail@email.com</li>
                                        <li>{formatToDateAndTimeString(Date.now())}</li>
                                        <li>3</li>
                                        <li>4</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="edit-button-container">
                                <button className="btn" onClick={this.handleProfileEditClick}>Edit Profile</button>
                                <button className="btn" onClick={this.handleChangeAvatarClick}>Change Avatar</button>
                            </div>
                        </div>
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                <img src={authorAvatar} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="fl_c"/>
                </div>
            </div>
        )
    }

    async componentDidMount() {
        //TODO: Get User Data from DB
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    handleProfileEditClick = () => {

    };

    handleChangeAvatarClick = () => {

    };

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

Profile.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
