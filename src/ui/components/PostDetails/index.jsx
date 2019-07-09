import React from 'react';
import PropTypes from 'prop-types';
import {formatToDateAndTimeString} from "../../../lib/utils";

import UserView from '../UserView/index';
import Spinner from '../Spinner/index';


export default class PostDetails extends React.PureComponent {
    render() {
        const {postId, created, category, text, title, type, postUser} = this.props;
        const createdString = formatToDateAndTimeString(created);
        return (
            <div>
                <div className="post-title forum-header">
                    <h2>{title}</h2>
                </div>
                {postId ? (
                    <div className="full-post post-details-container">
                        <div className="post">
                            <div className="post-info"><span
                                className="theme-color_txt">Category:</span> {category}, <span
                                className="theme-color_txt">Posted:</span> {createdString}
                                <span className="topic-type"> {type && (
                                    <span>#{type}</span>)}</span></div>
                            <div className="post-text">
                                <p>{text}</p>
                            </div>
                        </div>
                        <div className="author-info">
                            <UserView {...postUser}/>
                        </div>
                        <div className="fl_c"/>
                    </div>
                ) : (
                    <div  className="full-post post-details-container">
                        <Spinner/>
                    </div>
                )}
            </div>
        )
    }
}

PostDetails.propTypes = {
    postId: PropTypes.string,
    created: PropTypes.number,
    category: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    postUser: PropTypes.object,
};