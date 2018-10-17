import React from 'react';
import PropTypes from 'prop-types';
//Styles
import './side-bar.css';
//Components
import SidebarButtons from '../../mixins/SidebarButtons';
import Spinner from '../../mixins/Spinner';
import CategoryItem from '../../mixins/CategoryItem';

export default class SideBar extends React.PureComponent {
    render() {
        const {
            respond,
            page,
            clearReply,
            user,
            categories,
        } = this.props;
        const total = categories.length !== 0 && categories.map((x) => x.count).reduce((x, y) => x + y);
        return (
            <div ref={(input) => this.categoryBar = input}>
                <SidebarButtons {...{page, user, respond, clearReply}}/>
                <div className="search-filter">
                    <h5>Categories</h5>
                    {categories.length > 0 ? (
                        <ul>
                            {categories && categories.map((category, index) => <CategoryItem
                                key={index.toString()} {...category} />)}
                            <a href="/">
                                <li>All<span className="filter-count">{total}</span></li>
                            </a>
                        </ul>
                    ) : (
                        <div style={{marginTop: '20px'}}>
                            <Spinner/>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('scroll', this.moveBar);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.moveBar);
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
    }
}

PropTypes.SideBar = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    categories: PropTypes.array.isRequired,
};