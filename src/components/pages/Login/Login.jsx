import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';

//Api
import {signIn} from '../../../api/auth';

//Components
import  {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

//Styles
import './css/login.css';


class Login extends Component {
    state = {
        redirect: false,
        redirectUrl: '/',
        back: false,
        flashMessage: {},
        displayFlashMessage: false,
    }
    render() {
        //this.displayFlashMessage();
        return this.state.redirect ? (
            <Redirect to={this.state.redirectUrl}/>
        ) : (
            <div id="login">
                <div className="container">
                    {this.displayFlashMessageIfItSet()}
                    {this.state.back && <Link to={this.state.back}>
                        <button className="btn">Back</button>
                    </Link>}
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
                                <p><Link to="/register">Click to <span className="bold">Sign Up.</span></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    async componentDidMount() {
        //Handle Flash message if it was set in DB
        const flashMessage = JSON.parse(localStorage.getItem('flashMessage'));
        if (flashMessage) {
            const {msg, status, redirect, redirectUrl, back} = flashMessage;
            if (msg) {
                this.setState({displayFlashMessage: true, flashMessage: {msg, status}});
            }
            if (redirect === true) {
                FlashMessageHandler.update({redirect: false, redirectUrl: ''});
                this.setState({redirect: true, redirectUrl});
            }
            if (back) {
                this.setState({back});
            }
        }
    }

    //Login User
    login = async (e) => {
        e.preventDefault();
        const {email, password} = this;
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
        catch (error) {
            this.password.value = '';
            this.setState({displayFlashMessage: true, flashMessage: {msg: error.message, status: 'error'}});
        }
    };

    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                this.setState({displayFlashMessage: false});
                FlashMessageHandler.reset();
            }, 2500);
            return (<FlashMessage {...this.state.flashMessage} />)
        }
    }
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

export default Login;