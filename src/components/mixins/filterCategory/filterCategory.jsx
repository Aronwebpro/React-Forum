import React from 'react';
import PropTypes from 'prop-types';

//List item for categories in Aside category list
const FilterCategory = (props) => {
	const { category } = props;
	const url = /category/+category.categoryUrl;
	return (
		<a href={url} ><li>{category.name}<span className="filter-count">({category.count})</span></li></a>
	)
}
PropTypes.DefaultPropTypes = {
	category: {
		name: 'No Name',
		count: '0'
	}
}
PropTypes.FilterCategory = {
	category: PropTypes.object
}
export default FilterCategory