import React, { Component } from 'react';
import firebaseApp from '../../../firebase.js';

class Navigation extends Component {
	constructor() {
		super();
		this.logOut = this.logOut.bind(this);
	}
	logOut() {
		firebaseApp.auth().signOut().then(function() {
		 	let msg = 'GoodBye! You\'ve logged out successfully!';
			firebaseApp.database().ref('flash').update({status:true, msg:msg, msgStatus:'success', redirect: false, redirectUrl: ''});
		}).catch(function(error) {
		 	let msg = 'Ups! Something happen, you didn\'t log out!';
			firebaseApp.database().ref('flash').update({status:true, msg:msg, msgStatus:'error', redirect: false, redirectUrl: ''});
		});
		window.scrollTo(0,0);
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