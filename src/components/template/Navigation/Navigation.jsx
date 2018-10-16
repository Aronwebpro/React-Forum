import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//Api
import {signOut} from "../../../api/auth";
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

class Navigation extends React.PureComponent {
    render() {
        const {user} = this.props;
        return (
            <div className="navigation-wrapper">
                <nav
                    className={!this.props.user || (this.props.user && !this.props.user.authorAvatar) ? 'nav-logged-out' : undefined}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    {user ? (
                        <a className="theme-color_txt log-out" onClick={this.logOut} style={{cursor: 'pointer'}}>Logout</a>
                    ) : (
                        <Link to="/login" className="theme-color_txt log-out">Login</Link>
                    )}
                    {!user && <Link to="/register">Sign Up</Link>}
                </nav>
                {user && user.authorAvatar && (
                    <div className="header-avatar"><Link to="/user"><img src={user.authorAvatar} alt=""/></Link>
                    </div>)}
            </div>
        );
    }

    logOut = async () => {
        try {
            await signOut();
            let msg = 'GoodBye! You\'ve logged out successfully!';
            FlashMessageHandler.create(msg, 'success');
            window.location.reload();
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