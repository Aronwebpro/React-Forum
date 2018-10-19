import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//List item for categories in Aside category list
export default class CategoryItem extends React.PureComponent {
    render() {
        const {title, categoryUrl, count } = this.props;
        return (
            <Link to={`/category/${categoryUrl}`}>
                <li>{title}<span className="filter-count">({count})</span></li>
            </Link>
        )
    }
}

PropTypes.FilterCategory = {
    title: PropTypes.string.isRequired,
    categoryUrl: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};
