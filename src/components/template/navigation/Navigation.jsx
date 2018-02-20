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
			logout = (<a onClick={ this.logOut } style={ {cursor: 'pointer'} }>Logout</a>);
		} else {
			logout = (<a href="/login">Login</a>);
		}
		return (
			<nav>
				<a href="/">Home</a>
				<a href="/community">Community</a>
				<a href="/about">About</a>
				{ logout }
			</nav>
		);
	}
}

export default Navigation;