import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import firebase from 'firebase';
//import registerServiceWorker from './registerServiceWorker';
import firebaseApp from './firebase.js';
//Page Components
import Home from './components/pages/home/Home.jsx';
import NotFound from './components/pages/404/notfound.jsx';
import Post from './components/pages/post/Post';
import NewTopic from './components/pages/newtopic/NewTopic';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register.jsx';

//Template parts
import Header from './components/template/header/Header';
import Footer from './components/template/footer/Footer';

//Styles
import './css/styles.css'


firebase.auth().onAuthStateChanged( user => {
  if (user) {
  		console.log(user);
  		const user2 = {
  			uid: user.uid,
  			name: user.displayName,
  			memberSince: user.metadata.a,
  			avatar: user.photoURL
  		}

	    const Root = () => {
		const isLoggedIn = true;
			return (
				<BrowserRouter>
					<div className="page">
						<Header isLoggedIn={ isLoggedIn } user={ user } />
						<div className="content">	
							<Match exactly pattern="/" render={ () => <Home isLoggedIn={ isLoggedIn } /> } />
							<Match pattern="/post/:postId" render={(params) => <Post params={ params } isLoggedIn={ isLoggedIn } user={ user } /> } />
							<Match exactly pattern="/login" render={ () => <Login isLoggedIn={ isLoggedIn } /> } />
							<Match exactly pattern="/new" render={ () => <NewTopic isLoggedIn={ isLoggedIn } user={ user } /> } />
							<Match exactly pattern="/register" render={ () => <Register isLoggedIn={ isLoggedIn } /> } />
							<Miss component={NotFound} />
						</div>
						<Footer />
					</div>
				</BrowserRouter>		
			);
		};
		ReactDOM.render(<Root />, document.getElementById('root'));
  } else {
	    const Root = () => {
		const isLoggedIn = false;
			return (
				<BrowserRouter>
					<div className="page">
						<Header />
						<div className="content">	
							<Match exactly pattern="/" render={ () => <Home isLoggedIn={ isLoggedIn } /> } />
							<Match pattern="/post/:postId" render={(params) => <Post params={ params } isLoggedIn={ isLoggedIn } /> } />
							<Match exactly pattern="/login" render={ () => <Login isLoggedIn={ isLoggedIn } /> } />
							<Match exactly pattern="/new" render={ () => <NewTopic isLoggedIn={ isLoggedIn } /> } />
							<Match exactly pattern="/register" render={ () => <Register isLoggedIn={ isLoggedIn } /> } />
							<Miss component={NotFound} />
						</div>
						<Footer />
					</div>
				</BrowserRouter>		
			);
		};
		ReactDOM.render(<Root />, document.getElementById('root'));
  }
});











//registerServiceWorker();
