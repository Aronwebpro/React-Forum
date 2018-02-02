import React, {Component} from 'react'
import './css/login.css';


class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
	}
	login(e) {
		e.preventDefault();
		console.log('logging....');
	}
	render() {
		return (
			<div className="login-wrapper">
			<h1>Login: </h1>
				<div class="form-wrapper">
					<form>
						<label htmlFor="username">Username:</label>
						<input type="text" name="username"/>
						<label htmlFor="">Password:</label>
						<input type="password" name="password"/>
						<button class="btn" type="submit" name="submit" onClick={this.login}>Login</button>
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

export default Login;