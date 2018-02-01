import React, { Component } from 'react';

class FilterCategory extends Component {
	constructor() {
		super();
	}

	render() {
		const { category } = this.props;
		return (
			<li>{category.title}<span className="filter-count">({category.count})</span></li>
		)
	}
}

export default FilterCategory