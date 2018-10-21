import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


export default class  UserSidebar extends React.Component {
    render() {
        const {page} = this.props;
        const activeLinkStyle = {backgroundColor: '#6ab9d5', color: '#ededed', border: ' 2px solid #ededed'};
        const links = [
            {url: '/profile', pageName: 'profile', title: 'Profile'},
            {url: '/profile/posts', pageName: 'profile-posts', title: 'Posts'},
            {url: '/profile/friends', pageName: 'profile-friends', title: 'Friends'},
            {url: '/profile/settings', pageName: 'profile-settings', title: 'Settings'}
            ];
        return (
                <div className="search-filter">
                    <h5>Profile Settings</h5>
                    <ul>
                        {
                            links.map(({url, pageName, title}) => (
                                <Link to={url} key={title}>
                                    <li style={ page === pageName ? activeLinkStyle : {}} >{title}</li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
        )
    }
    componentDidMount() {

    }
}