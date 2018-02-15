import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';

//Template parts
import Header from '../../template/header/Header';
import Footer from '../../template/footer/Footer';
import Forum from '../../mixins/forum/Forum';

//Data
import data from '../../../topics.json';
import categories from '../../../categories.json';



class Home extends Component {
	constructor() {
		super();
		this.state = {topics: data};
	}
	render() {
		const { topics } = this.state;
		const { isLoggedIn } = this.props;
		return (
			<div id="home">
			<Header />	
	          <div className="content" >
	          		<div className="container">
	          				<div className="left">
	          					<SearchFilter categories={categories} page="home" isLoggedIn={ isLoggedIn } /> 
	          				</div>
	          				<div className="right">
	          					<Forum topics={ topics } />
	          				</div>

	          		</div>
	          </div>
	         <div className="fl_c"></div> 
			<Footer />
			</div>
		)
	}
}

export default Home;