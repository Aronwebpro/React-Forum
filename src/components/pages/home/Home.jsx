import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';

//Template parts
import Header from '../../template/header/Header';
import Footer from '../../template/footer/Footer';


//Data
import data from '../../../topics.json';
import categories from '../../../categories.json';



class Home extends Component {
	constructor() {
		super();
		this.state = {topics: []};
	}

	componentWillMount() {	

	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	render() {
		const { topics } = this.state;

		return (
			<div id="home">
			<Header />	
	          <div className="content" >
	          		<div className="container">
	          				<div className="left">
	          					<SearchFilter categories={categories} page="home" /> 
	          				</div>
	          				<div className="right">
	          					
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