import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import firebaseApp from './firebase.js';
import { Redirect } from 'react-router';
//import registerServiceWorker from './registerServiceWorker';


//Page Components
import Home from './components/pages/home/Home.jsx';
import NotFound from './components/pages/404/notfound.jsx';
import Post from './components/pages/post/Post';
import NewTopic from './components/pages/newtopic/NewTopic';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register.jsx';
import About from './components/pages/about/about.jsx';

//Template parts
import Header from './components/template/header/Header';
import Footer from './components/template/footer/Footer';

//Styles
import './css/styles.css'


firebaseApp.auth().onAuthStateChanged( user => {
  if (user) {
  		const date = new Date(Number.parseInt(user.metadata.a));	
  		let createdDate = '';
		if (date != 'Invalid Date') {
			createdDate = date.getMonth() + 1 + '/' + date.getDate() + ' ' + date.getFullYear();
		}

  		const userMeta = {
  			uid: user.uid,
  			authorName: user.displayName,
  			authorAvatar: user.photoURL,
  			memberSince: createdDate
  		}

	    const Root = () => {
			const isLoggedIn = true;
			return (
				<BrowserRouter>
					<div className="page">
						<Header isLoggedIn={ isLoggedIn } user={ userMeta } />
						<div className="content">	
							<Match exactly pattern="/" render={ () => <Home isLoggedIn={ isLoggedIn } user={ userMeta } /> } />
							<Match pattern="/post/:postId" render={(params) => <Post params={ params } isLoggedIn={ isLoggedIn } user={ userMeta } /> } />
							<Match exactly pattern="/category/:category" render={ (params) => <Home isLoggedIn={ isLoggedIn } params={params}/> } />
							<Match exactly pattern="/category/" render={ () => <Redirect to="/" /> } />
							<Match exactly pattern="/login" render={ () => <Login isLoggedIn={ isLoggedIn } user={ userMeta } /> } />
							<Match exactly pattern="/new" render={ () => <NewTopic isLoggedIn={ isLoggedIn } user={ userMeta } /> } />
							<Match exactly pattern="/register" render={ () => <Register isLoggedIn={ isLoggedIn } /> } /> 
							<Match exactly pattern="/about" component={ About } />

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
							<Match exactly pattern="/category/:category" render={ (params) => <Home isLoggedIn={ isLoggedIn } params={params}/> } />
							<Match exactly pattern="/category/" render={ () => <Redirect to="/" /> } />
							<Match exactly pattern="/login" render={ () => <Login isLoggedIn={ isLoggedIn } /> } />
							<Match exactly pattern="/new" render={ () => <NewTopic isLoggedIn={ isLoggedIn } /> } />
							<Match exactly pattern="/register" render={ () => <Register isLoggedIn={ isLoggedIn } /> } /> 
							<Match exactly pattern="/about" component={ About } />
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
