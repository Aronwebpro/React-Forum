import React, {Component} from 'react';
import firebaseApp from '../../../firebase.js';
import { Redirect } from 'react-router';
import Flash from '../../mixins/flash/Flash';
import PropTypes from 'prop-types';

//Avatar Images
import face1 from '../../../img/1face.png';
import face2 from '../../../img/2face.png';
import face3 from '../../../img/3face.png';
import face4 from '../../../img/4face.png';
import face5 from '../../../img/5face.png';
import face6 from '../../../img/6face.png';
import face7 from '../../../img/7face.png';
import face8 from '../../../img/8face.png';
import face9 from '../../../img/9face.png';
import face10 from '../../../img/10face.png';
import face11 from '../../../img/11face.png';
import face12 from '../../../img/12face.png';
import face13 from '../../../img/13face.png';
import face14 from '../../../img/14face.png';
import face15 from '../../../img/15face.png';
import face16 from '../../../img/16face.png';



class Register extends Component {
	constructor() {
		super();
		this.createUser = this.createUser.bind(this);
		this.state = {avatar: '', redirect:false, flash:false}

	}
	async createUser() {
		let _this = this; 
		this.setState({spinner: true});
		const nickname = this.nickname.value;
		const photo = this.state.avatar;
		if (photo === '') { this.setState({flash:true, flashMsg:'Please select Avatar!', flashStatus:'error'});  return; }
		if (nickname === '' ) { this.setState({flash:true, flashMsg:'Nickname field can\'t be blank!', flashStatus:'error'});  return; } else { this.setState({flash:false});}

		try {
			await firebaseApp.auth().createUserWithEmailAndPassword( this.email.value, this.password.value);		
			const user = await firebaseApp.auth().currentUser;
			await user.updateProfile({
				displayName:nickname,
				photoURL: photo
			});
			//User info to be saved		
			const input = {
					authorAvatar: photo,
					authorName: nickname,
					userID: user.uid,
					memberSince: user.metadata.a
			};
			//Generate unique Firebase DB key	
			const key = firebaseApp.database().ref().child('users').push().key;
			let updates = {};
			updates[key] = input;
			//Save new User to DB user 
			await firebaseApp.database().ref('users').update(updates);

			this.setState({redirect:true});
		}
		catch(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode == 'auth/weak-password') {
			_this.setState({flash:true, flashMsg:'The password is too weak!', flashStatus:'error'});
			} else {
			_this.setState({flash:true, flashMsg:errorMessage, flashStatus:'error'});
			}		
		}

	}
	checked(event) {
		this.setState({avatar: event.target.src, flash:false});
	}
	render() {
		const facesRow1 = [face1, face2, face3, face4, face5, face6, face7, face8 ];
		const facesRow2 = [face9, face10, face11, face12, face13, face14, face15, face16 ];
		if (this.state.redirect === true || this.props.user ) return ( <Redirect to="/" />)
		let spinner;	
		if(this.state.spinner === true)  spinner = (<span><img src="https://linkjuice.io/img/loading.gif" alt="" style={ {width: '30px', transform:'translateY(11px)' } }/></span> )	
		return (
			<div className="register-page">
				{ this.state.flash && <Flash status={this.state.flashStatus} text={this.state.flashMsg}/> }
				<h1>Please fill register form:</h1>
				<div className="form-wrapper">
					<div className="avatar-wrapper">
						<div className="avatar-title"><label>Choose Your Avatar:</label></div>					
							<form className="register-avatar-form" ref={input => this.avatar = input}>
								<div className="avatar-row">
									{ facesRow1.map((face, i) => { 
										return (
											<div key={face} className="avatar-square">
												<input type="radio" name="avatar" id={`img${i+1}`} value={face} />
												<label id="" htmlFor={`img${i+1}`} onClick={this.checked.bind(this)}><img src={face} alt=""/></label>
											</div>														
										)
									}) }
								</div>
								<div className="avatar-row">
								{ facesRow2.map((face, i) => { 
										return (
											<div key={face} className="avatar-square">
												<input type="radio" name="avatar" id={`img${i+9}`} value={face} />
												<label id="" htmlFor={`img${i+9}`} onClick={this.checked.bind(this)}><img src={face} alt=""/></label>
											</div>														
										)
									}) }		
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
Register.PropTypes = {
	user:PropTypes.object
}
export default Register;