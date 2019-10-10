import * as React from 'react';
import * as PropTypes from 'prop-types';

// Router
import { Link } from 'react-router-dom';

// @types
type Props = {
    title: string;
    categoryUrl: string;
    active: string
    count: number
}

export default class CategoryItem extends React.PureComponent<Props, {}> {
    public static propTypes = {
        title: PropTypes.string,
        categoryUrl: PropTypes.string,
        count: PropTypes.number
    };

    public render() {
        const {
            title,
            categoryUrl,
            count,
            active
        } = this.props;

        return (
            <Link to={`/category/${categoryUrl}`}>
                <li
                    style={
                        active === categoryUrl ? {backgroundColor: '#6ab9d5', color: '#ededed', border: ' 2px solid #ededed'} : {}
                    }
                >
                    {title}
                    <span className="filter-count">({count})</span>
                </li>
            </Link>
        )
    }
}
