import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//Components
import Navigation from '../Navigation/Navigation';
//Styles
import './css/header.css';


export default class Header extends PureComponent {
    render() {
        const {user} = this.props;
        return (
            <header id="header" ref={input => this.header = input}>
                <div className='app-header'>
                    <Link to="/">
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                            alt=""/>
                        <h1 className='app-title'>Games <span className="theme-color_txt">Forum</span></h1>
                    </Link>
                </div>
                <Navigation {...{user}}/>
            </header>
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.shrinkHeader);
    }

    componentWillUnmount() {

    }
    //shrink the Header when scroll down
    shrinkHeader() {
        const header = this.header;
        if (!header) return;
        const distanceY = window.pageYOffset;
        if (distanceY > 101) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    }


}

PropTypes.Header = {
    user: PropTypes.object
};
