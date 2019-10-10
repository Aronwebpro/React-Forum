import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// User Messages
import { FlashMessage } from '../../components/common/FlashMessage/FlashMessage';
import { FlashMessageHandler } from '../../../lib/utils/FlashMessageHandler';

// Components
import Switcher from '../../components/common/Switcher';
import Spinner from '../../components/common/Spinner';

// Lookups
import { getUserSettings } from '../../../api/lookups';

// Transactions
import API from '../../../api/transactions';

export default class ProfileSettings extends React.Component {
    state = {
        loading: true,
        updateLoading: false,
        displayFlashMessage: false,
        redirect: false,
        emailNotifications: true,
        subscribeNews: true,
        privateProfile: false,
    };

    render() {
        const { emailNotifications, privateProfile, subscribeNews, loading, updateLoading, displayFlashMessage } = this.state;
        if (this.state.redirect) return <Redirect to="/"/>;
        return (
            <div className="container">
                {displayFlashMessage && this.displayFlashMessageIfItSet()}
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Settings</h2>
                    </div>
                    <div className="forum-content">
                        <div className="forum-content-inner">
                            <div className="profile-info-container">
                                {loading ? (<Spinner/>) : (
                                    <div className="profile-info-wrapper">
                                        <div className="user-info-row">
                                            <div className="settings-table">
                                                <ul>
                                                    <li>
                                                        <span className="settings-title">Email Notifications:</span>
                                                        <span className="switcher-container">
                                                        <Switcher
                                                            checked={emailNotifications}
                                                            handleCheck={this.handleEmailNotificationSwitch}
                                                        />
                                                    </span>
                                                    </li>
                                                    <li>
                                                        <span
                                                            className="settings-title">Subscribe News and Updates:</span>
                                                        <span className="switcher-container">
                                                        <Switcher checked={subscribeNews}
                                                                  handleCheck={this.handleSubscribeNewsSwitch}/>
                                                    </span>
                                                    </li>
                                                    <li>
                                                        <span className="settings-title">Private Profile</span>
                                                        <span className="switcher-container">
                                                        <Switcher checked={privateProfile}
                                                                  handleCheck={this.handlePrivateProfileSwitch}/>
                                                    </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="edit-button-container">
                                            <button className="btn" onClick={this.updateUserSettings}>
                                                Update Settings
                                            </button>
                                            <div className="edit-button-inner">
                                                {updateLoading && (<Spinner/>)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="fl_c"/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        this.updateScreenData();
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    updateScreenData = async () => {
        const { user } = this.props;
        const { settings } = await getUserSettings(user.uid);
        if (settings) {
            this.setState({ loading: false, ...settings });
        } else {
            this.setState({ loading: false });
        }
    };

    //Update Users Settings Handler
    updateUserSettings = async () => {
        this.setState({ updateLoading: true });
        const { uid } = this.props.user;
        const { emailNotifications, subscribeNews, privateProfile } = this.state;
        const { result, error } = await API.updateUserSettings({ uid, emailNotifications, subscribeNews, privateProfile });

        if (error) {
            this.setState({ displayFlashMessage: true, msg: error, status: 'error', updateLoading: false });
        } else if (result) {
            this.setState({
                displayFlashMessage: true,
                msg: 'Settings has been Updated!',
                status: 'success',
                updateLoading: false
            });
        }
    };

    //User Message Handler
    displayFlashMessageIfItSet = () => {
        const { msg, status, displayFlashMessage } = this.state;
        if (displayFlashMessage) {
            setTimeout(() => {
                if (!this.isUnmount) {
                    this.setState({ displayFlashMessage: false });
                }
                FlashMessageHandler.reset();
            }, 2500);
            return <FlashMessage {...{ msg, status }} />;
        }
    };

    //Switcher Handlers
    handleEmailNotificationSwitch = () => this.setState({ emailNotifications: !this.state.emailNotifications });
    handleSubscribeNewsSwitch = () => this.setState({ subscribeNews: !this.state.subscribeNews });
    handlePrivateProfileSwitch = () => this.setState({ privateProfile: !this.state.privateProfile });

}

ProfileSettings.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
