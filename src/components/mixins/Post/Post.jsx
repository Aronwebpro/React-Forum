import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//Styles
import './post.css';
//Api
import {getUserProfile} from '../../../api/lookups';
//Utils
import {formatToDateString, formatToTimeString} from '../../../utils'
//Components
import Spinner from '../Spinner';
import UserView from '../UserView';

//images
import defGm from './img/forum_img.png';
import brdGm from './img/board-games.png';
import CardGm from './img/card-games.jpg';
import PcGm from './img/pc-games.png';
import ConsGm from './img/console-games.png';
import HandGm from './img/handheld-games.png';

export default class Post extends Component {
    state = {
        user: '',
        lastUser: '',
    };

    render() {
        const {postId, created, repliesCount, category, text, title, type, lastReply} = this.props;
        const {user, lastUser} = this.state;

        return (
            <div className="topic">
                <Link to={`/post/${postId}`}>
                    <div className="row-left">
                        <div className="topic-category">
                            <div className="category-img">
                                <img src={this.categoryImg(category)} alt=""/>
                            </div>
                            <p>{category}</p>
                        </div>
                    </div>
                    <div className="row-middle">
                        <div className="topic-title-wrapper topic-title">
                            <div className="fl_l title-left">
                                <h3>{title}</h3>
                                <p>
                                    <span className="theme-color_txt">Created:</span>
                                    <span className="created-time">{`${formatToDateString(created)} ${formatToTimeString(created)}`}</span>
                                    <span className="topic-type">{type && (<span>#{type}</span>)}</span>
                                </p>
                            </div>
                            <div className="fl_l title-right">
                                <table style={{borderLeft: '1px solid #ededde'}}>
                                    <tbody>
                                    <tr>
                                        <th width="20%">Replies:</th>
                                        <th style={{fontWeight: '600', fontSize: '1.1em'}}>{repliesCount}</th>
                                        <th rowSpan="2" style={{borderLeft: '1px solid #ededde'}}>
                                            {lastUser ? (
                                                <UserView {...user} {...{lastReply}} type={'last'}/>
                                            ) : (
                                                <Spinner/>
                                            )}
                                        </th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="fl_c"></div>
                        </div>
                        <div className="topic-description">
                            <p>{text}</p>
                        </div>
                        <div className="topic-readmore theme-color_txt">
                            <p>Click to Discuss</p>
                        </div>
                    </div>
                    <div className="row-right">
                        {user ? (
                            <UserView {...user}/>
                        ) : (
                            <Spinner/>
                        )}
                    </div>

                </Link>
                <div className="fl_c"/>
            </div>
        );
    }

    componentDidMount() {
        this.getUsersForPost();
    }

    componentWillUnmount() {
        //Setup Flag to know is component Unmounted
        this.isUnmounted = true;
    }
    //Fetch Post from DB
    getUsersForPost = async () => {
        const {userId, lastUserId} = this.props;
        if (userId === lastUserId) {
            const user = await getUserProfile({userId});
            if (!this.isUnmounted) {
                this.setState({user, lastUser: user});
            }
        } else {
            const [user, lastUser] = await Promise.all([
                getUserProfile({userId}),
                getUserProfile({userId: lastUserId})
            ]);
            if (!this.isUnmounted) {
                this.setState({user, lastUser});
            }
        }
    };
    //Return Image by Post Category
    categoryImg = (category) => {
        switch (category) {
            case 'Board Games':
                return brdGm;
            case 'Card Games':
                return CardGm;
            case 'PC Games':
                return PcGm;
            case 'Console Games':
                return ConsGm;
            case 'Handle Games':
                return HandGm;
            default:
                return defGm;
        }
    }
}

Post.propTypes = {
    userId: PropTypes.string.isRequired,
    lastUserId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    repliesCount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lastReply: PropTypes.number.isRequired,
};