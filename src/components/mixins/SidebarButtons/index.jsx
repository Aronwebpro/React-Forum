import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//Api
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

//Style
import './sidebarButtons.css';

export default class SidebarButtons extends React.PureComponent {
    render() {
        return (
            <div className="navigation-buttons">
                {this.sidebarButtons()}
            </div>
        )
    }

    sidebarButtons = () => {
        const {
            reset,
            user,
            page,
        } = this.props;
        switch (page) {
            case 'home' :
                if (user) {
                    return (<Link to="/newPost" className="new-topic-button btn">New Discussion</Link>);
                } else {
                    return (
                        <Link to="/login" onClick={this.handleNewDiscussionWithouUser} className="new-topic-button btn">
                            New Discussion
                        </Link>
                    );
                }
            case 'post' :
                if (user) {
                    return (
                        <div>
                            <Link to="/" className="back-button btn">Back</Link>
                            <a onClick={this.handleReplyWithUser} className="new-comment-button btn">
                                Write Comment
                            </a>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Link to="/" className="back-button btn">Back</Link>
                            <Link to="/login" onClick={this.handleReplyWithoutUser} className="new-comment-button btn">
                                Write Comment
                            </Link>
                        </div>
                    )
                }
            case 'new' :
                return (
                    <div className="navigation-buttons">
                        <Link to="/" className="back-button btn">Back</Link>
                        <a onClick={reset} className="new-comment-button btn">Reset</a>
                    </div>
                );
            default :
                return (
                    <div/>
                )
        }
    };

    handleReplyWithUser = () => {
        const {respond, clearReply} = this.props;
        respond();
        clearReply();
    };
    handleReplyWithoutUser = () => {
        FlashMessageHandler.create('Sorry! You have to login to Reply!', 'error', false, '', window.location.to)
    };
    handleNewDiscussionWithouUser = () => {
        FlashMessageHandler.create('Sorry! You have to login If you want to start new Discussion!', 'error', false, '', '/')
    };
};

PropTypes.SidebarButtons = {
    user: PropTypes.object,
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    reset: PropTypes.func,
};