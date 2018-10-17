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
import Notfound from './components/pages/404/Notfound.jsx';
import PostDetail from './components/pages/PostDetail/PostDetail';
import NewPost from './components/pages/CreatePost/CreatePost';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register.jsx';
import About from './components/pages/About/about.jsx';

//Template parts
import Header from './components/template/Header/Header';
import Footer from './components/template/Footer/Footer';

//Styles
import './css/theme.css'


const Root = (props) => {
    const {user} = props;
    return (
        <BrowserRouter>
            <div className="page">
                <Header {...{user}}/>
                <div className="content">
                    <Switch>
                        <Route path="/post/:postId" render={(params) => <PostDetail {...{params, user}} />} />
                        <Route exact path="/category/:category" render={(params) => <Home {...{params, user}} byrka={'byrka'}/>} />
                        <Route exact path="/category" render={(params) => <Redirect to="/"/>}/>
                        <Route exact path="/login" render={() => <Login {...{user}}/>} />
                        <Route exact path="/newPost" render={() => <NewPost {...{user}}/>}/>
                        <Route exact path="/register" render={() => <Register {...{user}}/>}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/" render={() => <Home {...{user}}/>}/>
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

