import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './post.css';

//Utils
import {formatToDateString, formatToTimeString} from '../../../utils'
//images
import defGm from './img/forum_img.png';
import brdGm from './img/board-games.png';
import CardGm from './img/card-games.jpg';
import PcGm from './img/pc-games.png';
import ConsGm from './img/console-games.png';
import HandGm from './img/handheld-games.png';


class Post extends Component {
    state = {
        users: [{post: 0}]
    };

    render() {
        const {userId, postId, created, repliesCount, category, text, title, type, lastUserId, lastReply} = this.props;
        const lastAvatar = '';
        const lastCommentAuthor = '';

        const authorAvatar = '';
        const authorName = '';
        const memberSince = '';

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
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <th style={{
                                                        textAlign: 'right',
                                                        fontWeight: '600',
                                                        fontSize: '1.1em'
                                                    }}>Most Recent
                                                    </th>
                                                    <th rowSpan="3" width="50px">
                                                        <img src={lastAvatar} alt=""/>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign: 'right'}}><span
                                                        className="theme-color_txt">By:</span> <span style={{
                                                        textAlign: 'right',
                                                        fontWeight: '600'
                                                    }}>{lastCommentAuthor}</span></td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign: 'right'}}>{`${formatToDateString(lastReply)} ${formatToTimeString(lastReply)}`}</td>
                                                </tr>
                                                </tbody>
                                            </table>
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
                        <div className="author-avatar">
                            <img src={authorAvatar} alt=""/>
                        </div>
                        <div className="topic-meta theme-color_txt">
                            <p>
                                By: <span className="author">{authorName} </span>
                            </p>
                            <p>
                                Member Since: <span className="date">{memberSince}</span>
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="fl_c"/>
            </div>
        );
    }

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

export default Post;
