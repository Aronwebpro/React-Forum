import * as React from 'react';
import * as PropTypes from 'prop-types';

// Utils
import { formatToDateAndTimeString } from '../../../../lib/utils/index';

// Components
import UserView from '../../common/UserView';

//Styles
import './comment.css';

// @types
type AddQuoteToCommentParams = {
    text: string
    commentId: string
    authorName: string
    clickedComment: number
}

type Props = {
    created: string
    text: string
    user: any
    replyStyle: {
        [key: string]: string
    }
    replyStyleInit: {
        [key: string]: string
    }
    index: number
    clickedComment: number
    quoteText: string
    quoteAuthorName: string
    commentId: string
    handleQuoteClick: (index: number) => void
    addQuoteToComment: ({ text, commentId, authorName, clickedComment }: AddQuoteToCommentParams) => void
}

export default class Comment extends React.PureComponent<Props, {}> {
    public static propTypes = {};

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
        let clickedStyle: { [key: string]: string } = { display: 'none' };
        if (index === clickedComment) clickedStyle = replyStyleInit;

        //Date and time comments was created
        const cretedString = formatToDateAndTimeString(created);

        return (
            <div className="comment">
                <div className="full-post">
                    <div
                        className="reply-to-this"
                        style={clickedStyle}
                    >
                        <div className="reply-to-this_text">
                            <div
                                className="reply-to-this-text-inner"
                                style={replyStyle}
                                onClick={this.handleQuoteClick}
                            >
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
                            <p onClick={this.handleReplyClick}>Click to qoute</p>
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

    handleReplyClick = (): void => {
        const { handleQuoteClick, index } = this.props;
        handleQuoteClick(index);
    };

    handleQuoteClick = (): void => {
        const { text, user, commentId, addQuoteToComment, index } = this.props;
        addQuoteToComment({
            text,
            commentId,
            authorName: user.authorName,
            clickedComment: index,
        });
    }
};

