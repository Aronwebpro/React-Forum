import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {signOut} from "../../../api/auth";
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

class Navigation extends Component {

    render() {
        const {user} = this.props;
        return (
            <div className="navigation-wrapper">
                <nav
                    className={!user || (user && !user.authorAvatar) ? 'nav-logged-out' : undefined}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    {user && <a className="theme-color_txt log-out" onClick={this.logOut} style={{cursor: 'pointer'}}>Logout</a>}
                    {user && <a href="/profile" style={{marginRight: '0', fontStyle: 'italic'}} >{user.authorName}</a>}
                    {!user &&  <a className="theme-color_txt log-out" href="/login">Login</a>}
                    {!user &&  <a href="/register">Sign Up</a>}
                </nav>
                {this.props.user && this.props.user.authorAvatar && (
                    <div className="header-avatar"><a href="/profile"><img src={this.props.user.authorAvatar} alt=""/></a>
                    </div>)}
            </div>

        );
    }

    componentDidMount() {
        if (this.props.user && !this.props.user.authorAvatar) this.setState({});
    }

    //Log Out User with FireBase Handler and show message
    logOut = async () => {
        try {
            await signOut();
            let msg = 'GoodBye! You\'ve logged out successfully!';
            FlashMessageHandler.create(msg, 'success');
        } catch (e) {
            let msg = 'Ups! Something happen, you didn\'t log out!';
            FlashMessageHandler.create(msg, 'error');
        }
        window.scrollTo(0, 0);
    }
};

PropTypes.Navigation = {
    user: PropTypes.object
}

export default Navigation;