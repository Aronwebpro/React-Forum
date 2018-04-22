import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import FlashMessage, {FlashMessageHandler} from '../../mixins/FlashMessage/FlashMessage';
import { signIn } from '../../../Model/queries';

//Styles
import './css/login.css';


class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
		this.state = {redirect: false, back:false, flashMessage:{}, displayFlashMessage: false }
	}
	async componentDidMount() {

		//Handle Flash message if it was set in DB 
		const flashMessage = JSON.parse(localStorage.getItem('flashMessage'));
		if (flashMessage) {
			if (flashMessage.msg) {
				console.log('petras');
				this.setState({displayFlashMessage:true});
			}
			if (flashMessage.redirect === true) {
				FlashMessageHandler.update({redirect: false, redirectUrl: ''});
				this.setState({redirect:true});
			}
			if (flashMessage.back) {
				this.setState({back: flashMessage.back});
			} 
		}							
	}
	//Login User 
	async login(e) {
		e.preventDefault();
		const { email, password } = this;
		try {
			//Sign In User and get user's data
			const user = await signIn(email.value, password.value);
			//Set Flash message and save to DB
			if (user) {
				const msg = 'Welcome back ' + user.displayName + '! You\'ve logged in successfully!';
				FlashMessageHandler.create(msg, 'success');
				this.setState({redirect: true});
			}
		}
		catch(error) {
			//this.setState({flash:true, flashMsg: error.message, flashStatus:'error'});
			//FlashMessageHandler.create(error.message, 'error');
			this.setState({displayFlashMessage: true, flashMessage: {msg: error.message, status: 'error'}});
		}
	}
	render() {
		if (this.state.displayFlashMessage) setTimeout(() => {
			this.setState({displayFlashMessage:false});
			FlashMessageHandler.reset();
		}, 2500);
		
			return this.state.redirect ? (
				<Redirect to="/" />
			) : (
				<div id="login">
					<div className="container">
					{this.state.displayFlashMessage && <FlashMessage {...this.state.flashMessage} /> }
						{ this.state.back && <a  href={this.state.back}><button className="btn">Back</button></a>}
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
									<p><a href="/register">Click to <span className="bold">Sign Up.</span></a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
}

Login.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
}

export default Login;