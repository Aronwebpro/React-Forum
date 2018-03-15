import React, { Component } from 'react';
import FilterCategory from '../filterCategory/filterCategory';
import './css/filter.css';
import NavigationBnt from '../navigationButtons/navigationBtn.jsx';
import firebaseApp from '../../../firebase';

class SearchFilter extends Component {
	constructor(props) {
		super(props);
		this.moveBar = this.moveBar.bind(this);
		this.state = {categories:{}};
	}
	componentWillMount() {
		this.refTopics = firebaseApp.database()
							.ref('/categories/')
							.once('value')
							.then((snapshot) => {
								this.setState({categories: snapshot.val()});
							});				
	}
	componentDidMount() {
		//window.addEventListener('scroll', this.moveBar);
	}
	moveBar() {
	const header = this.categoryBar;
	if (!header) return;
	const distanceY = window.pageYOffset;
	  if(distanceY > 101) {
	    header.style.top = '60px';
	  } else {
	    header.style.top = '94px';
	  }
	}
	render() {
		const {isLoggedIn, respond, clearReply, flash } = this.props;
		const { categories } = this.state;
		let all = 0;
		return(
			<div ref={(input) => this.categoryBar = input}>
				<NavigationBnt page={this.props.page} isLoggedIn={ isLoggedIn } respond={ respond } clearReply={ clearReply } flash={ flash }/>
				<div className="search-filter">
					<h5>Select a Category</h5>
					<ul>
						{
							Object.keys(categories).map(category => {
								all += categories[category].count;
								return <FilterCategory key={Math.random()} category={categories[category]} />
							})
						}
						{
							Number.isInteger(all) && <a href="/" ><li>All<span className="filter-count">({all})</span></li></a>
						}		
					</ul>
				</div>
			</div>
		)
	}
}

export default SearchFilter;