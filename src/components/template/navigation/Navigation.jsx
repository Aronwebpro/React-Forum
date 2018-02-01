import React, { Component } from 'react';

class Navigation extends Component {
	
	render() {
		return(
			<nav>
				<a href="/home">Home</a>
				<a href="/community">Community</a>
				<a href="/about">About</a>
				<a href="/login">Login</a>
			</nav>
		);
	}
}

export default Navigation;