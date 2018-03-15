import React, {Component} from 'react';
import firebaseApp from '../../../firebase.js';
import { Redirect } from 'react-router';
import Flash from '../../mixins/flash/Flash';

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
	createUser() {
		let _this = this; 
		this.setState({spinner: true});
		const nickname = this.nickname.value;
		const photo = this.state.avatar;
		if (photo === '') { this.setState({flash:true, flashMsg:'Please select Avatar!', flashStatus:'error'});  return; }
		if (nickname === '' ) { this.setState({flash:true, flashMsg:'Nickname field can\'t be blank!', flashStatus:'error'});  return; } else { this.setState({flash:false});}

		firebaseApp.auth().createUserWithEmailAndPassword( this.email.value, this.password.value)
			.then ((userData) => {
				const user = firebaseApp.auth().currentUser;
				user.updateProfile({
					displayName:nickname,
					photoURL: photo
				});
				return user;			  	
			})
			.then((user) => {
				const input = {
						authorAvatar: photo,
						authorName: nickname,
						userID: user.uid,
						memberSince: user.metadata.a
				};	
				const key = firebaseApp.database().ref().child('users').push().key;
				let updates = {};
				updates[key] = input;
				this.postRef = firebaseApp.database()
								.ref('users')
								.update(updates)
								.catch( err => {
									console.log('Error!');
									console.log(err);
								});
			 })
			.then(() => {
				this.setState({redirect:true});
			}) 
		    .catch((error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode == 'auth/weak-password') {
			  	_this.setState({flash:true, flashMsg:'The password is too weak!', flashStatus:'error'});
			  } else {
			    _this.setState({flash:true, flashMsg:errorMessage, flashStatus:'error'});
			  }
			  //console.log(error);
			});

	}
	checked(event) {
		this.setState({avatar: event.target.src, flash:false});
	}
	render() {
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
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img1" value={face1} />
										<label id="" htmlFor="img1" onClick={this.checked.bind(this)}><img src={face1} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img2" value={face2}/>
										<label id="" htmlFor="img2" onClick={this.checked.bind(this)}><img src={face2} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img3" value={face3}/>
										<label id="" htmlFor="img3" onClick={this.checked.bind(this)}><img src={face3} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img4" value={face4}/>
										<label id="" htmlFor="img4" onClick={this.checked.bind(this)}><img src={face4} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img5" value={face5}/>
										<label id="" htmlFor="img5" onClick={this.checked.bind(this)}><img src={face5} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img6" value={face6}/>
										<label id="" htmlFor="img6" onClick={this.checked.bind(this)}><img src={face6} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img7" value={face7}/>
										<label id="" htmlFor="img7" onClick={this.checked.bind(this)}><img src={face7} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img8" value={face8}/>
										<label id="" htmlFor="img8" onClick={this.checked.bind(this)}><img src={face8} alt=""/></label>
									</div>	
								</div>
								<div className="avatar-row">
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img9" value={face9} />
										<label id="" htmlFor="img9" onClick={this.checked.bind(this)}><img src={face9} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img10" value={face10}/>
										<label id="" htmlFor="img10" onClick={this.checked.bind(this)}><img src={face10} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img11" value={face11}/>
										<label id="" htmlFor="img11" onClick={this.checked.bind(this)}><img src={face11} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img12" value={face12}/>
										<label id="" htmlFor="img12" onClick={this.checked.bind(this)}><img src={face12} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img13" value={face13}/>
										<label id="" htmlFor="img13" onClick={this.checked.bind(this)}><img src={face13} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img14" value={face14}/>
										<label id="" htmlFor="img14" onClick={this.checked.bind(this)}><img src={face14} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img15" value={face15}/>
										<label id="" htmlFor="img15" onClick={this.checked.bind(this)}><img src={face15} alt=""/></label>
									</div>
									<div className="avatar-square">
										<input type="radio" name="avatar" id="img16" value={face16}/>
										<label id="" htmlFor="img16" onClick={this.checked.bind(this)}><img src={face16} alt=""/></label>
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