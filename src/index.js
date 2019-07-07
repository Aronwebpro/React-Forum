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
import { auth } from 'firebase/app';

//Layout Higher Order Component
import PageLayout from './components/template/PageLayout/index.js';
import AuthenticatedRoute from './components/AuthenticatedRoute';

//Components
import Home from './components/pages/Home/Home.jsx';
import Notfound from './components/pages/404/Notfound.jsx';
import PostDetail from './components/pages/PostDetail/PostDetail';
import NewPost from './components/pages/CreatePost/CreatePost';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import About from './components/pages/About/about';
import User from './components/pages/User/User';
//Profile
import ProfileSidebar from './components/mixins/ProfileSidebar';
import Profile from './components/pages/Profile/Profile';
import ProfilePosts from './components/pages/Profile/ProfilePosts';
import ProfileFriends from './components/pages/Profile/ProfileFriends';
import ProfileSettings from './components/pages/Profile/ProfileSettings';


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
    pageId: 'register',
});
const LoginPage = PageLayout({
    PageComponent:  Login,
    pageId: 'login',
});
const UserPage = PageLayout({
    PageComponent: User,
    SideBarComponent: SideBar,
    pageId: 'user',
    layout: 'withSidebar',
});
const ProfilePage = PageLayout({
    PageComponent: Profile,
    SideBarComponent: ProfileSidebar,
    pageId: 'profile',
    layout: 'withSidebar',
});

const ProfilePostsPage = PageLayout({
    PageComponent: ProfilePosts,
    SideBarComponent: ProfileSidebar,
    pageId: 'profile-posts',
    layout: 'withSidebar',
});
const ProfileFriendsPage = PageLayout({
    PageComponent: ProfileFriends,
    SideBarComponent: ProfileSidebar,
    pageId: 'profile-friends',
    layout: 'withSidebar',
});
const ProfileSettingsPage = PageLayout({
    PageComponent: ProfileSettings,
    SideBarComponent: ProfileSidebar,
    pageId: 'profile-settings',
    layout: 'withSidebar',
});


const Root = (props) => {
    const {user} = props;
    return (
        <BrowserRouter>
            <div className="page">
                <Header {...{user}}/>
                <div className="content">
                    <Switch>
                        {/*Category*/}
                        <Route exact path="/category/:category" render={(params) => <HomePage {...{params, user}}/>}/>
                        <Route exact path="/category" render={() => <Redirect to="/"/>}/>
                        {/*Profile*/}
                        <AuthenticatedRoute {...{user}} exact path='/profile/posts' render={() => <ProfilePostsPage {...{user}}/>} />
                        <AuthenticatedRoute {...{user}} exact path='/profile/friends' render={() => <ProfileFriendsPage {...{user}}/>} />
                        <AuthenticatedRoute {...{user}} exact path='/profile/settings' render={() => <ProfileSettingsPage {...{user}}/>} />
                        <AuthenticatedRoute {...{user}} exact path='/profile' render={() => <ProfilePage {...{user}}/>} />
                        {/*User*/}
                        <Route exact path="/user/:id" render={() => <UserPage /> } />
                        <Route exact path="/user" render={() =>  <Redirect to="/"/>} />
                        {/*Other*/}
                        <Route path="/post/:postId" render={(params) => <PostDetail {...{params, user}} />}/>
                        <Route exact path="/newPost" render={() => <NewPost {...{user}}/>}/>
                        <Route exact path="/login" render={() => <LoginPage {...{user}}/>}/>
                        <Route exact path="/register" render={() => <RegisterPage {...{user}}/>}/>
                        <Route exact path="/about" component={AboutPage}/>
                        {/*Home*/}
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
    user: PropTypes.object,
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
        ReactDOM.render(<Root/>, document.getElementById('root'));
    }
});

