import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
//Components
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';
//Api
import API from '../../../api/transactions';
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

//Avatars Rows
const facesRow1 = [face1, face2, face3, face4, face5, face6, face7, face8];
const facesRow2 = [face9, face10, face11, face12, face13, face14, face15, face16];

class Register extends Component {
    constructor() {
        super();
        this.createUser = this.createUser.bind(this);
        this.setCheckedAvatar = this.setCheckedAvatar.bind(this);
        this.state = {avatar: '', redirect: false, displayFlashMessage: false, flashMessage: {}, spinner: false}

    }

    async createUser() {
        this.setState({spinner: true});
        const nickname = this.nickname.value;
        const userProfile = {
            nickname: this.nickname.value,
            avatar: this.state.avatar,
            email: this.email.value,
            password: this.password.value,
        }
        //Basic Validation
        if (this.state.avatar === '') {
            this.setState({displayFlashMessage: true, flashMessage: {msg: 'Please select Avatar!', status: 'error'}});
            return;
        }
        if (nickname === '') {
            this.setState({
                displayFlashMessage: true,
                flashMessage: {msg: 'Nickname field can\'t be blank!', status: 'error'}
            });
            return;
        }

        //Make API Call to Create New User
        const {status, msg} = await API.createUser(userProfile);

        if (status === 'success') {
            FlashMessageHandler.create(`Welcome to React Game Forum, ${nickname}`, 'success');
            this.setState({redirect: true});
        } else {
            this.setState({displayFlashMessage: true, flashMessage: {msg, status}, spinner: true});
        }
    }

    setCheckedAvatar(url) {
        this.setState({avatar: url, flash: false});
    }

    displayFlashMessageIfItSet() {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                this.setState({displayFlashMessage: false});
                FlashMessageHandler.reset();
            }, 2500);
            return (<FlashMessage {...this.state.flashMessage} />)
        }
    }

    render() {
        //Redirect From the page
        if (this.state.redirect === true || this.props.user) return (<Redirect to="/"/>)
        //TODO: Before redirect to Home page show spinner image for user
        //let spinner;
        return (
            <div className="register-page">
                {this.displayFlashMessageIfItSet()}
                <h1>Please fill register form:</h1>
                <div className="form-wrapper">
                    <div className="avatar-wrapper">
                        <div className="avatar-title"><label>Choose Your Avatar:</label></div>
                        <form className="register-avatar-form" ref={input => this.avatar = input}>
                            <div className="avatar-row">
                                {facesRow1.map((face, i) => {
                                    return (
                                        <div key={face} className="avatar-square">
                                            <input type="radio" name="avatar" id={`img${i + 1}`} value={face}/>
                                            <label id="" htmlFor={`img${i + 1}`}
                                                   onClick={() => this.setCheckedAvatar(face)}><img src={face} alt=""/></label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="avatar-row">
                                {facesRow2.map((face, i) => {
                                    return (
                                        <div key={face} className="avatar-square">
                                            <input type="radio" name="avatar" id={`img${i + 9}`} value={face}/>
                                            <label id="" htmlFor={`img${i + 9}`}
                                                   onClick={() => this.setCheckedAvatar(face)}><img src={face} alt=""/></label>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>
                    </div>
                    <form className="register-data-form">
                        <label htmlFor="nickname">Nick Name:</label>
                        <input type="text" name="nickname" ref={input => this.nickname = input}/>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" ref={input => this.email = input}/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" ref={input => this.password = input}/>
                    </form>
                    <button className='btn' onClick={this.createUser}>Register</button>
                </div>
            </div>
        )
    }
}

Register.PropTypes = {
    user: PropTypes.object
}
export default Register;