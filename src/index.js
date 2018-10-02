import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import firebaseApp from './firebase.js';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
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
import './css/theme.css'


const Root = (props) => {
	const {
		isLoggedIn,
		userMeta 
	} = props;
	return (
		<BrowserRouter>
			<div className="page">
				<Header isLoggedIn={ isLoggedIn } user={ userMeta } />
				<div className="content">	
					<Match exactly pattern="/" render={ () => userMeta ?  <Home isLoggedIn={ isLoggedIn } user={ userMeta } /> : <Home isLoggedIn={ isLoggedIn } />} />
					<Match pattern="/post/:postId" render={(params) => userMeta ? <Post params={ params } isLoggedIn={ isLoggedIn } user={ userMeta } /> : <Post params={ params } isLoggedIn={ isLoggedIn } />} />
					<Match exactly pattern="/category/:category" render={ (params) => userMeta ? <Home isLoggedIn={ isLoggedIn } params={params} /> : <Home isLoggedIn={ isLoggedIn } params={params}/> } />
					<Match exactly pattern="/category/" render={ () => <Redirect to="/" /> } />
					<Match exactly pattern="/login" render={ () => userMeta ? <Login isLoggedIn={ isLoggedIn } user={ userMeta } /> : <Login isLoggedIn={ isLoggedIn } /> } />
					<Match exactly pattern="/new" render={ () => userMeta ? <NewTopic isLoggedIn={ isLoggedIn } user={ userMeta } /> : <NewTopic isLoggedIn={ isLoggedIn } /> } />
					<Match exactly pattern="/register" render={ () => userMeta ? <Register isLoggedIn={ isLoggedIn } /> : <Register isLoggedIn={ isLoggedIn } /> } />
					<Match exactly pattern="/about" component={ About } /> 
					<Miss component={NotFound} />
				</div>
				<Footer />
			</div>
		</BrowserRouter>		
	);
};
PropTypes.Root = {
	userMeta: PropTypes.object,
	isLoggedIn: PropTypes.bool
}

firebaseApp.auth().onAuthStateChanged( user => {
	if (user) {
		const date = new Date(Number.parseInt(user.metadata.a, 10));	
  		let createdDate = '';
		if (date !== 'Invalid Date') {
			createdDate = date.getMonth() + 1 + '/' + date.getDate() + ' ' + date.getFullYear();
		}

  		const userMeta = {
  			uid: user.uid,
  			authorName: user.displayName,
  			authorAvatar: user.photoURL,
  			memberSince: createdDate
  		}
		ReactDOM.render(<Root userMeta={userMeta} isLoggedIn={true} />, document.getElementById('root'));
	} else {
		ReactDOM.render(<Root isLoggedIn={false} />, document.getElementById('root'));
	} 
});

//Disable for now
//registerServiceWorker();
