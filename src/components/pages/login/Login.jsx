import React, {Component} from 'react';
import { Redirect } from 'react-router';
import firebaseApp from '../../../firebase.js';
import Flash from '../../mixins/flash/Flash';

//Styles
import './css/login.css';


class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
		this.state = {flash: false, redirect: false}
	}
	componentDidMount() {
		this.refTopics = firebaseApp.database()
							.ref('flash')
							.once('value')
							.then((snapshot) => {
								let data = snapshot.val();
								if (data && data.redirect === true) {
									firebaseApp.database().ref('flash').update({redirect: false, redirectUrl: ''});
									this.setState({redirect:true});
								}
								if (data && data.redirect === false && data.status === true ) {	
									firebaseApp.database().ref('flash').update({status:false, msg:'', msgStatus:'' });
									this.setState({flash:data.status, flashMsg:data.msg, flashStatus:data.msgStatus, redirect:true});
								}							
							});						
	}
	login(e) {
		e.preventDefault();
		let _this = this;
		const email = this.email.value;
		const password = this.password.value;
		firebaseApp.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
			let msg = 'Welcome back ' + user.displayName + '! You\'ve logged in successfully!';
			firebaseApp.database().ref('flash').update({status:true, msg:msg, msgStatus:'success', redirect: true, redirectUrl: '/'});
		})
		.catch(function(error) {
		  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  _this.setState({flash:true, flashMsg:errorMessage, flashStatus:'error'});
		  // ...
		});
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />
		} else {
			if(this.state.flash) {
				setTimeout(() => {
					this.setState({flash:false});
				}, 1800);
			}
			return (
				<div id="login">
					<div className="container">
						{ this.state.flash && <Flash status={this.state.flashStatus} text={this.state.flashMsg}/> }
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
					</div>
				</div>
			)
		}
	}
}

export default Login;