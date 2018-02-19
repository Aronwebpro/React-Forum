import React, {Component} from 'react';
import { Redirect } from 'react-router';
import firebaseApp from '../../../firebase.js';

//Styles
import './css/login.css';


class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
	}
	login(e) {
		e.preventDefault();

		const email = this.email.value;
		const password = this.password.value;
		
		firebaseApp.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	}
	render() {
		if (this.props.isLoggedIn === true) {
			return <Redirect to="/" />
		} else {
			return (
				<div className="login-wrapper">
				<h1>Login: </h1>
					<div className="form-wrapper">
						<form>
							<label htmlFor="email">Email:</label>
							<input type="text" name="email" ref={input => this.email = input}/>
							<label htmlFor="">Password:</label>
							<input type="password" name="password" ref={input => this.password = input}/>
							<button className="btn" type="submit" name="submit" onClick={this.login}>Login</button>
						</form>
						<div className="dont-have-acc">
							<p>Don't have an account?</p>
							<p>Click <a href="/register">Here</a> to Register.</p>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default Login;