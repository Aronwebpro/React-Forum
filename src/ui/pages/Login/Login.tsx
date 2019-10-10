import * as React  from 'react';

// React Router
import { Link, withRouter } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

// Api
import { signIn } from '../../../api/auth';

// Components
import Message from '../../components/common/Message';

//Styles
import './css/login.css';

// @types
type Props = RouteChildrenProps & {}

class Login extends React.Component<Props, {}> {
    render() {
        return (
            <div className="container">
                {/*{this.state.back && <Link to={this.state.back}>*/}
                {/*    <button className="btn">Back</button>*/}
                {/*</Link>}*/}
                <div className="login-wrapper">
                    <h1>Login: </h1>
                    <div className="form-wrapper">
                        <form
                            onSubmit={this.handleLogin}
                        >
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" ref={this.emailInput}/>
                            <label htmlFor="">Password:</label>
                            <input type="password" name="password" ref={this.passwordInput}/>
                            <button className="btn" type="submit" name="submit">Login</button>
                        </form>
                        <div className="dont-have-acc">
                            <p>Don't have an account?</p>
                            <p><Link to="/register">Click to <span className="bold">Sign Up.</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private emailInput: React.RefObject<any> = React.createRef();
    private passwordInput: React.RefObject<any> = React.createRef();

    // handle user login
    handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = this.emailInput.current.value;
        const password = this.passwordInput.current.value;

        try {
            // Sign In User and get user's data
            const { user }: { user: GoogleUser} = await signIn(email, password);

            if (user) {
                const { history } = this.props;
                history.push('/');
                Message.success(`Welcome back ${user.displayName}`);
            }
        } catch (err) { //
            if (err.code === 'auth/user-not-found') {
                Message.error('User not found');
            } else if (err.code === 'auth/wrong-password') {
                Message.error('Password is invalid');
            } else if (err.code === 'auth/invalid-email') {
                Message.error('Email is badly formatted');
            } else {
                Message.error('Failed to Login');
            }
            this.passwordInput.current.value = '';
        }
    };
}

export default withRouter(Login)