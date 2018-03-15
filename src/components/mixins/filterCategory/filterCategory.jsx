import React from 'react';

const FilterCategory = (props) => {
	const { category } = props;
	const url = /category/+category.categoryUrl;
	return (
		<a href={url} ><li>{category.name}<span className="filter-count">({category.count})</span></li></a>
	)
}
export default FilterCategory