import React, { Component } from 'react';
import FilterCategory from '../filterCategory/filterCategory';
import './css/filter.css';
import NavigationBnt from '../navigationButtons/navigationBtn.jsx';

class SearchFilter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { categories, isLoggedIn, respond } = this.props;
		return(
			<div>
				<NavigationBnt page={this.props.page} isLoggedIn={ isLoggedIn } respond={ respond }/>
				<div className="search-filter">
					<h5>Select a Category</h5>
					<ul>
						{this.props.categories.map((category) => {
							return <FilterCategory key={Math.random()} category={category} />
						})			
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default SearchFilter;