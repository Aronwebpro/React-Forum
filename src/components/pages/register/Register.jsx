import React, {Component} from 'react';
import firebaseApp from '../../../firebase.js';
import base from '../../../base';
import { Redirect } from 'react-router';

class Register extends Component {
	constructor() {
		super();
		this.createUser = this.createUser.bind(this);
		this.state = {avatar: '', redirect:false}

	}
	createUser() {
		const nickname = this.nickname.value;
		const photo = this.state.avatar;
		if (photo === '') { alert('Please select Avatar'); return; }
		firebaseApp.auth().createUserWithEmailAndPassword( this.email.value, this.password.value)
			.then ((userData) => {
				const user = firebaseApp.auth().currentUser;
				user.updateProfile({
					displayName:nickname,
					photoURL: photo
				});

				const input = {};
				input[userData.uid] = {
					authorAvatar: photo,
					authorName: nickname,
					userID: userData.uid,
					memberSince: userData.metadata.a
				};
		  		this.userRef = base.update('users', {
				    data: input
				  });
		  		this.setState({redirect:true});
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
			  //console.log(error);
			});

	}
	checked(event) {
		this.setState({avatar: event.target.src});
	}
	render() {
		if (this.state.redirect === true ) return ( <Redirect to="/" />)
		return (
			<div className="register-page">
				<h1>Please fill register form:</h1>
				<div className="form-wrapper">
					<div className="avatar-wrapper">
						<div className="avatar-title"><label>Choose Your Avatar:</label></div>					
							<form className="register-avatar-form" ref={input => this.avatar = input}>
								<div className="avatar-row">
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img1" value="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png" />
										<label id="" htmlFor="img1" onClick={this.checked.bind(this)}><img src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img2" value="http://www.iconarchive.com/download/i47414/hopstarter/face-avatars/Female-Face-FC-4.ico"/>
										<label id="" htmlFor="img2" onClick={this.checked.bind(this)}><img src="http://www.iconarchive.com/download/i47414/hopstarter/face-avatars/Female-Face-FC-4.ico" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img3" value="http://www.iconarchive.com/download/i47456/hopstarter/face-avatars/Male-Face-D1.ico"/>
										<label id="" htmlFor="img3" onClick={this.checked.bind(this)}><img src="http://www.iconarchive.com/download/i47456/hopstarter/face-avatars/Male-Face-D1.ico" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img4" value="http://static.iconarchive.com/download/i47437/hopstarter/face-avatars/Female-Face-FI-2.ico"/>
										<label id="" htmlFor="img4" onClick={this.checked.bind(this)}><img src="http://static.iconarchive.com/download/i47437/hopstarter/face-avatars/Female-Face-FI-2.ico" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img5" value="http://www.iconarchive.com/download/i47432/hopstarter/face-avatars/Female-Face-FH-2-slim.ico"/>
										<label id="" htmlFor="img5" onClick={this.checked.bind(this)}><img src="http://www.iconarchive.com/download/i47432/hopstarter/face-avatars/Female-Face-FH-2-slim.ico" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img6" value="http://www.iconarchive.com/download/i47459/hopstarter/face-avatars/Male-Face-D4.ico"/>
										<label id="" htmlFor="img6" onClick={this.checked.bind(this)}><img src="http://www.iconarchive.com/download/i47459/hopstarter/face-avatars/Male-Face-D4.ico" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img7" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-H1-icon.png"/>
										<label id="" htmlFor="img7" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-H1-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img8" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FD-1-dark-icon.png"/>
										<label id="" htmlFor="img8" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FD-1-dark-icon.png" alt=""/></label>
									</div>	
								</div>
								<div className="avatar-row">
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img9" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-M3-icon.png" />
										<label id="" htmlFor="img9" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-M3-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img10" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-A2-icon.png"/>
										<label id="" htmlFor="img10" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-A2-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img11" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FB-3-icon.png"/>
										<label id="" htmlFor="img11" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FB-3-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img12" value="http://www.iconarchive.com/download/i47473/hopstarter/face-avatars/Male-Face-G3.ico"/>
										<label id="" htmlFor="img12" onClick={this.checked.bind(this)}><img src="http://www.iconarchive.com/download/i47473/hopstarter/face-avatars/Male-Face-G3.ico" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img13" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FI-4-icon.png"/>
										<label id="" htmlFor="img13" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FI-4-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img14" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-M4-icon.png"/>
										<label id="" htmlFor="img14" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-M4-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img15" value="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FH-5-slim-icon.png"/>
										<label id="" htmlFor="img15" onClick={this.checked.bind(this)}><img src="http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Female-Face-FH-5-slim-icon.png" alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img16" value="http://www.iconarchive.com/download/i47406/hopstarter/face-avatars/Female-Face-FB-1.ico"/>
										<label id="" htmlFor="img16" onClick={this.checked.bind(this)}><img src="http://www.iconarchive.com/download/i47406/hopstarter/face-avatars/Female-Face-FB-1.ico" alt=""/></label>
									</div>	
								</div>																									
							</form>
						
					</div>
					<form className="register-data-form">
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