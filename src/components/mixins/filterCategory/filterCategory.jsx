import React, { Component } from 'react';

class FilterCategory extends Component {
	constructor() {
		super();
	}
	render() {
		const { category } = this.props;
		const url = /category/+category.categoryUrl;
		return (
			<a href={url} ><li>{category.name}<span className="filter-count">({category.count})</span></li></a>
		)
	}
}

export default FilterCategory