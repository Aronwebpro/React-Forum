import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

//Api
import {auth} from 'firebase/index';

//Layout Higher Order Component
import PageLayout from './components/template/PageLayout/index.js';


//Page Components
import Home from './components/pages/Home/Home.jsx';
import Notfound from './components/pages/404/Notfound.jsx';
import PostDetail from './components/pages/PostDetail/PostDetail';
import NewPost from './components/pages/CreatePost/CreatePost';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register.jsx';
import About from './components/pages/About/about.jsx';


//Template parts
import Header from './components/template/Header/Header';
import Footer from './components/template/Footer/Footer';
import SideBar from './components/template/SideBar';

//Styles
import './css/theme.css'

const HomePage = PageLayout({
    PageComponent:  Home,
    SideBarComponent:  SideBar,
    pageId: 'home',
    layout: 'withSidebar'
});
const AboutPage = PageLayout({
    PageComponent:  About,
    pageId: 'about',
});
const RegisterPage = PageLayout({
    PageComponent:  Register,
    pageId: 'about',
});
const LoginPage = PageLayout({
    PageComponent:  Login,
    pageId: 'about',
});

const Root = (props) => {
    const {user} = props;
    return (
        <BrowserRouter>
            <div className="page">
                <Header {...{user}}/>
                <div className="content">
                    <Switch>
                        <Route path="/post/:postId" render={(params) => <PostDetail {...{params, user}} />}/>
                        <Route exact path="/newPost" render={() => <NewPost {...{user}}/>}/>
                        <Route exact path="/login" render={() => <LoginPage {...{user}}/>}/>
                        <Route exact path="/register" render={() => <RegisterPage {...{user}}/>}/>
                        <Route exact path="/category/:category"
                               render={(params) => <HomePage {...{params, user}}/>}/>
                        <Route exact path="/category" render={(params) => <Redirect to="/"/>}/>
                        <Route exact path="/about" component={AboutPage}/>
                        <Route exact path="/" render={() => <HomePage {...{user}}/> } />
                        <Route component={Notfound}/>
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

