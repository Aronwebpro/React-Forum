import React, { Component } from 'react';
import FilterCategory from '../filterCategory/filterCategory';
import './css/filter.css';
import NavigationBnt from '../navigationButtons/navigationBtn.jsx';
import firebaseApp from '../../../firebase';

class SearchFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {categories:{}};
	}
	componentWillMount() {
		this.refTopics = firebaseApp.database()
							.ref('categories')
							.once('value')
							.then((snapshot) => {
								this.setState({categories: snapshot.val()});
							});				
	}
	render() {
		const {isLoggedIn, respond, clearReply, flash } = this.props;
		const { categories } = this.state;
		return(
			<div>
				<NavigationBnt page={this.props.page} isLoggedIn={ isLoggedIn } respond={ respond } clearReply={ clearReply } flash={ flash }/>
				<div className="search-filter">
					<h5>Select a Category</h5>
					<ul>
						{
							Object.keys(categories).map(category => {
								return <FilterCategory key={Math.random()} category={categories[category]} />
							})
						}	
					</ul>
				</div>
			</div>
		)
	}
}

export default SearchFilter;