import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//List item for categories in Aside category list
export default class CategoryItem extends React.PureComponent {
    render() {
        const {title, categoryUrl, count, active } = this.props;
        return (
            <Link to={`/category/${categoryUrl}`}>
                <li style={active === categoryUrl ? {backgroundColor: '#6ab9d5', color: '#ededed', border: ' 2px solid #ededed'} : {}}>{title}<span className="filter-count">({count})</span></li>
            </Link>
        )
    }
}

PropTypes.FilterCategory = {
    title: PropTypes.string.isRequired,
    categoryUrl: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};
