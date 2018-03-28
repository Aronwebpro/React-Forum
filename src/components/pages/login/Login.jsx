import React, {Component} from 'react';
import { Redirect } from 'react-router';
import firebaseApp from '../../../firebase.js';
import Flash from '../../mixins/flash/Flash';
import PropTypes from 'prop-types';

//Styles
import './css/login.css';


class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
		this.state = {flash: false, redirect: false, back:false }
	}
	async componentDidMount() {
		//Handle Flash message if it was set in DB 
		const snapshot = await firebaseApp.database().ref('flash').once('value');
		let data = snapshot.val();
		if (data) {
			if (data.redirect === true) {
				firebaseApp.database().ref('flash').update({redirect: false, redirectUrl: ''});
				this.setState({redirect:true});
			}
			if (data.redirect === false && data.status === true && this.props.isLoggedIn ) {	
				firebaseApp.database().ref('flash').update({status:false, msg:'', msgStatus:'' });
				this.setState({flash:data.status, flashMsg:data.msg, flashStatus:data.msgStatus, redirect:true});
			}
			if (data.redirect === false && data.status === true && !this.props.isLoggedIn ) {	
				firebaseApp.database().ref('flash').update({status:false, msg:'', msgStatus:'' });
				this.setState({flash:data.status, flashMsg:data.msg, flashStatus:data.msgStatus, redirect:false});
			}
			if (data.back) {
				this.setState({back: data.back});
			} 
		}							
	}
	//Login User 
	async login(e) {
		e.preventDefault();
		const { email, password } = this;
		try {
			//Sign In User and get user's data
			const user = await firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
			//Set Flash message and save to DB
			let msg = 'Welcome back ' + user.displayName + '! You\'ve logged in successfully!';
			firebaseApp.database().ref('flash').update({status:true, msg:msg, msgStatus:'success', redirect: true, redirectUrl: '/'});
			this.setState({redirect:true});
		}
		catch(error) {
			this.setState({flash:true, flashMsg: error.message, flashStatus:'error'});
		}
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />
		} else {
			if(this.state.flash) {
				setTimeout(() => {
					this.setState({flash:false});
				}, 4000);
			}
			return (
				<div id="login">
					<div className="container">
						{ this.state.flash && <Flash status={this.state.flashStatus} text={this.state.flashMsg}/> }
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
}
Login.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
}

export default Login;