import React, { Component } from 'react';
import firebaseApp from '../../../firebase.js';

class Navigation extends Component {
	constructor() {
		super();
		this.logOut = this.logOut.bind(this);
	}
	componentDidMount() {
		if ( this.props.user && !this.props.user.authorAvatar) this.setState({});
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
		let log;
		if (this.props.user) {
			log = (<a className="theme-color_txt log-out" onClick={ this.logOut } style={ {cursor: 'pointer'} }>Logout</a>);
		} else {
			log = (<a className="theme-color_txt log-out" href="/login">Login</a>);
		}
		return (
			<div className="navigation-wrapper">
				<nav className={!this.props.user || this.props.user && !this.props.user.authorAvatar ? 'nav-logged-out' : undefined }>
					<a href="/">Home</a>
					<a href="/community">Community</a>
					<a href="/about">About</a>
					{ log }
					{ !this.props.user && <a href="/register">Sign Up</a>}
				</nav>
				{ this.props.user && this.props.user.authorAvatar && (<div className="header-avatar"><a href="/user"><img src={ this.props.user.authorAvatar } alt=""/></a></div>)}
			</div>

		);
	}
}

export default Navigation;