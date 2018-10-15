import React from 'react';
import PropTypes from 'prop-types';
import {formatToDateAndTimeString} from '../../../utils';
//Components
import UserView from '../UserView';

//Styles
import './comment.css';

//Comment Layout Component
export default class Comment extends React.PureComponent {
    render() {
        const {
            created,
            text,
            user,
            clickedComment,
            replyStyle,
            replyStyleInit,
            index,
            quoteText,
            quoteAuthorName,
        } = this.props;
        //Show Comment overlay style if somebody clicked to quote
        let clickedStyle = {display: 'none'};
        if (index === clickedComment) clickedStyle = replyStyleInit;

        //Date and time comments was created
        const cretedString = formatToDateAndTimeString(created);
        return (
            <div className="comment">
                <div className="full-post">
                    <div className="reply-to-this" style={clickedStyle}>
                        <div className="reply-to-this_text">
                            <div className="reply-to-this-text-inner" style={replyStyle} onClick={this.handleQuoteClick} >
                                Quote this Comment?
                            </div>
                        </div>
                    </div>
                    <div className="post">
                        <div className="post-info"><p><span
                            className="theme-color_txt">Replied:</span> {cretedString}</p></div>
                        <div className="post-text">
                            {quoteText && (
                                <div className="quote">
                                    <p className="theme-color_txt quote-authorName"><span>{quoteAuthorName}</span> said: </p>
                                    <p>"{quoteText}"</p>
                                </div>
                            )}
                            <p>{text}</p>
                        </div>
                        <div className="quote-comment theme-color_txt">
                            <p onClick={this.handleReplyClick} >Click to qoute</p>
                        </div>
                    </div>
                    <div className="author-info">
                        <UserView {...user} />
                    </div>

                    <div className="fl_c"/>
                </div>
                <div className="fl_c"/>
            </div>
        )
    }
    handleReplyClick = () => {
        const {handleQuoteClick, index} = this.props;
        handleQuoteClick(index);
    };

    handleQuoteClick = () => {
        const {text, user, commentId, addQuoteToComment, index} = this.props;
        addQuoteToComment({
            text,
            commentId,
            authorName: user.authorName,
            clickedComment: index,
        });
    }
};

PropTypes.Comment = {
    commentId: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    postedDate: PropTypes.number.isRequired,
    clickedComment: PropTypes.string,
    respondText: PropTypes.string,
    replyStyleInit: PropTypes.object,
    replyStyle: PropTypes.object
};
