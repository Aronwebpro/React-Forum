import React, {Component} from 'react';
import PropTypes from 'prop-types';
//Styles
import './side-bar.css';
//Components
import SidebarButtons from '../../mixins/SidebarButtons';
import FilterCategory from '../../mixins/filterCategory/filterCategory';

export default class SideBar extends Component {
    state = {
        categories: []
    };

    render() {
        const {
            respond,
            page,
            clearReply,
            user,
        } = this.props;

        const {categories} = this.state;
        let all = 0;
        return (
            <div ref={(input) => this.categoryBar = input}>
                <SidebarButtons {...{page, user, respond, clearReply}}/>
                <div className="search-filter">
                    <h5>Select a Category</h5>
                    <ul>
                        {
                            Object.keys(categories).map(category => {
                                all += categories[category].count;
                                return <FilterCategory key={Math.random()} category={categories[category]}/>
                            })
                        }
                        {
                            Number.isInteger(all) &&
                            <a href="/">
                                <li>All<span className="filter-count">({all})</span></li>
                            </a>
                        }
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    //TODO: Move Navigation bar up on scroll down
    // componentDidMount() {
    // 	window.addEventListener('scroll', this.moveBar);
    // }
    // moveBar() {
    // const Header = this.categoryBar;
    // if (!Header) return;
    // const distanceY = window.pageYOffset;
    //   if(distanceY > 101) {
    //     Header.style.top = '60px';
    //   } else {
    //     Header.style.top = '94px';
    //   }
    // }
}

PropTypes.SideBar = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
};