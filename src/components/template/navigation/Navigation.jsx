import React, { Component } from 'react';
import firebaseApp from '../../../firebase.js';

class Navigation extends Component {
	constructor() {
		super();
		this.logOut = this.logOut.bind(this);
	}
	logOut() {
		firebaseApp.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});
	}
	render() {
		let logout;
		if (this.props.user) {
			logout = (<a className="theme-color_txt log-out" onClick={ this.logOut } style={ {cursor: 'pointer'} }>Logout</a>);
		} else {
			logout = (<a className="theme-color_txt log-out" href="/login">Login</a>);
		}
		return (
			<div className="navigation-wrapper">
				<nav className={!this.props.user ? 'nav-logged-out' : undefined }>
					<a href="/">Home</a>
					<a href="/community">Community</a>
					<a href="/about">About</a>
					{ logout }
				</nav>
				{ this.props.user && (<div className="header-avatar"><a href="/user"><img src={ this.props.user.photoURL } alt=""/></a></div>)}
			</div>

		);
	}
}

export default Navigation;