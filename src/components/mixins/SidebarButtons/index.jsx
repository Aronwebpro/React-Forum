import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//Api
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

//Style
import './sidebarButtons.css';

const SidebarButtons = (props) => {
    const {
        respond,
        clearReply,
        reset,
        isLoggedIn
    } = props;
    let BackBtn;
    let actionBnt;

    if (props.hasOwnProperty('page')) {
        switch (props.page) {
            case 'Home' :
                if (!props.isLoggedIn) {
                    actionBnt = (<Link to="/newPost" className="new-topic-button btn">New Discussion</Link>);
                } else {
                    actionBnt = (<Link to="/login"
                                    onClick={() => FlashMessageHandler.create('Sorry! You have to login to start new Discussion!', 'error', false, '', window.location.href)}
                                    className="new-topic-button btn"
                    >
                        New Discussion
                    </Link>);
                }
                break;
            case 'post' :
                if (isLoggedIn) {
                    BackBtn = (<Link to="/" className="back-button btn">Back</Link>);
                    actionBnt = (<Link onClick={() => {
                        respond();
                        clearReply();
                    }} className="new-comment-button btn">Reply</Link>);
                } else {
                    BackBtn = (<Link to="/" className="back-button btn">Back</Link>);
                    actionBnt = (<Link to="/login"
                                    onClick={() => FlashMessageHandler.create('Sorry! You have to login to Reply!', 'error', false, '', window.location.to)}
                                    className="new-comment-button btn"
                    >
                        Reply
                    </Link>);
                }
                break;
            case 'new' :
                BackBtn = (<Link to="/" className="back-button btn">Back</Link>);
                actionBnt = (<a onClick={reset} className="new-comment-button btn">Reset</a>);
                break;
            default :
                break;
        }
    }

    return (
        <div className="navigation-buttons">
            {BackBtn} {actionBnt}
        </div>
    )
};

PropTypes.SidebarButtons = {
    page: PropTypes.string,
    respond: PropTypes.func,
    clearReply: PropTypes.func,
    reset: PropTypes.func,
    isLoggedIn: PropTypes.bool
}

export default SidebarButtons;