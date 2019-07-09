import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Styles
import './side-bar.css';

// Components
import SidebarButtons from '../../components/SidebarButtons';
import Spinner from '../../components/Spinner';
import CategoryItem from '../../components/CategoryItem';

// Api
import { getCategories } from '../../../api/lookups.js';

export default class SideBar extends React.Component {
    state = {
        categories: [],
    };

    render() {
        const {
            respond,
            page,
            clearReply,
            user,
            params,
        } = this.props;
        let active = 'all';
        if (params) {
            active = params.location.pathname.split('/category/').join('');
        }

        const { categories } = this.state;
        const total = categories.length !== 0 && categories.map((x) => x.count).reduce((x, y) => x + y);
        return (
            <div ref={(input) => this.categoryBar = input}>
                <SidebarButtons {...{ page, user, respond, clearReply }}/>
                <div className="search-filter">
                    <h5>Categories</h5>
                    {categories.length > 0 ? (
                        <ul>
                            {categories && categories.map((category, index) => (
                                <CategoryItem key={index.toString()} {...category} {...{ active }}/>
                            ))}
                            <Link to="/">
                                <li style={active === 'all' ? {
                                    backgroundColor: '#6ab9d5',
                                    color: '#ededed',
                                    border: ' 2px solid #ededed'
                                } : {}}>All<span className="filter-count">{total}</span></li>
                            </Link>
                        </ul>
                    ) : (
                        <div style={{ marginTop: '20px' }}>
                            <Spinner/>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.moveBar);
        const categories = await getCategories();
        if (!this.isUnmount) {
            this.setState({ categories });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.moveBar);
        this.isUnmount = true;
    }

    moveBar = () => {
        const Header = this.categoryBar;
        if (!Header) return;
        const distanceY = window.pageYOffset;
        if (distanceY > 101) {
            Header.style.top = '60px';
        } else {
            Header.style.top = '94px';
        }
    };
}

PropTypes.SideBar = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    categories: PropTypes.array.isRequired,
};