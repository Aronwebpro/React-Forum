import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import PropTypes from 'prop-types';

//Api
import {auth} from 'firebase/index';


//PageLayout Components
import Home from './components/pages/Home/Home.jsx';
import NotFound from './components/pages/404/notfound.jsx';
import Post from './components/pages/post/Post';
import NewPost from './components/pages/CreatePost/CreatePost';
import Login from './components/pages/Login/Login';
import Register from './components/pages/register/Register.jsx';
import About from './components/pages/about/about.jsx';

//Template parts
import Header from './components/template/header/Header';
import Footer from './components/template/footer/Footer';

//Styles
import './css/theme.css'


const Root = (props) => {
    const {
        isLoggedIn,
        user
    } = props;

    return (
        <BrowserRouter>
            <div className="page">
                <Header {...{isLoggedIn}}/>
                <div className="content">
                    <Switch>
                        <Route path="/post/:postId" render={(params) => <Post {...{params, isLoggedIn, user}} />} />
                        <Route exact path="/category/:category" render={(params) => <Home {...{params, isLoggedIn, user}}/>} />
                        <Route exact path="/category/" render={() => <Redirect to="/"/>}/>
                        <Route exact path="/login" render={() => <Login {...{isLoggedIn, user}}/>} />
                        <Route exact path="/newPost" render={() => <NewPost {...{isLoggedIn, user}}/>}/>
                        <Route exact path="/register" render={() => <Register {...{isLoggedIn}}/>}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/" render={() => <Home {...{isLoggedIn, user}}/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
};
PropTypes.Root = {
    userMeta: PropTypes.object,
    isLoggedIn: PropTypes.bool
};

auth().onAuthStateChanged(userObj => {
    if (userObj) {

        const user = {
            uid: userObj.uid,
            authorName: userObj.displayName,
            authorAvatar: userObj.photoURL,
        };
        ReactDOM.render(<Root {...{user}} />, document.getElementById('root'));
    } else {
        ReactDOM.render(<Root isLoggedIn={false}/>, document.getElementById('root'));
    }
});

