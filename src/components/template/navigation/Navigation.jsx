import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {signOut} from "../../../api/auth";
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

class Navigation extends Component {
    constructor() {
        super();
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        if (this.props.user && !this.props.user.authorAvatar) this.setState({});
    }

    async logOut() {
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

    render() {
        let log;
        if (this.props.user) {
            log = (<a className="theme-color_txt log-out" onClick={this.logOut} style={{cursor: 'pointer'}}>Logout</a>);
        } else {
            log = (<Link className="theme-color_txt log-out" to="/login">Login</Link>);
        }
        return (
            <div className="navigation-wrapper">
                <nav
                    className={!this.props.user || (this.props.user && !this.props.user.authorAvatar) ? 'nav-logged-out' : undefined}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    {log}
                    {!this.props.user && <Link to="/register">Sign Up</Link>}
                </nav>
                {this.props.user && this.props.user.authorAvatar && (
                    <div className="header-avatar"><a href="/user"><img src={this.props.user.authorAvatar} alt=""/></a>
                    </div>)}
            </div>

        );
    }
};

PropTypes.Navigation = {
    user: PropTypes.object
}

export default Navigation;