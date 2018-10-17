import React from 'react';
import PropTypes from 'prop-types';

//List item for categories in Aside category list
export default class CategoryItem extends React.PureComponent {
    render() {
        const {title, categoryUrl, count } = this.props;
        return (
            <a href={`/category/${categoryUrl}`}>
                <li>{title}<span className="filter-count">({count})</span></li>
            </a>
        )
    }
}

PropTypes.FilterCategory = {
    title: PropTypes.string.isRequired,
    categoryUrl: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};
