import React, {Component} from 'react';
import firebaseApp from '../../../firebase.js';


class Register extends Component {
	constructor() {
		super();
		this.createUser = this.createUser.bind(this);
	}
	createUser() {
		const input = {
			email: this.email.value,
			password: this.password.value,
			nickname: this.nickname.value,
			photoURL: ''
		}
		const nickname = this.nickname.value;
		firebaseApp.auth().createUserWithEmailAndPassword( this.email.value, this.password.value)
			.then (() => {
				var user = firebaseApp.auth().currentUser;
				user.updateProfile({
				  displayName: nickname,
				  photoURL: "https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png"
				});
			})
		    .catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode == 'auth/weak-password') {
			    alert('The password is too weak.');
			  } else {
			    alert(errorMessage);
			  }
			  console.log(error);
			});

	}
	render() {
		return (
			<div className="register-page">
				<div className="form-wrapper">
					<form>
						<label htmlFor="nickname">Nick Name:</label>
						<input type="text" name="nickname" ref={input => this.nickname = input} />
						<label htmlFor="email">Email:</label>
						<input type="text" name="email" ref={input => this.email = input}/>
						<label htmlFor="password">Password:</label>
						<input type="password" name="password" ref={input => this.password = input}/>
					</form>
					<button className='btn' onClick={ this.createUser }>Register</button>
				</div>
				
			</div>
		)
	}
}

export default Register;