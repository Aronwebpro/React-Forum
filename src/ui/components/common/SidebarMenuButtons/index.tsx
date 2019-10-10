import * as React from 'react';
import * as PropTypes from 'prop-types';

// React Router
import { Link } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

//Style
import './sidebarButtons.css';

// Components
import Message from '../common/Message';

// @types
type Props = RouteChildrenProps & {
    reset: () => void
    clearReply: () => void
    respond: () => void
    user: User
    page: string
}

export default class SidebarButtons extends React.PureComponent<Props, {}> {
    public static propTypes = {
        user: PropTypes.object,
        page: PropTypes.string,
        respond: PropTypes.func,
        clearReply: PropTypes.func,
        reset: PropTypes.func,
    };

    public render() {
        return (
            <div className="navigation-buttons">
                {this.sidebarButtons()}
            </div>
        )
    }

    private sidebarButtons = () => {
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
                        <Link to="/login" onClick={this.handleNewDiscussionWithoutUser} className="new-topic-button btn">
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

    private handleReplyWithUser = () => {
        const { respond, clearReply } = this.props;
        respond();
        clearReply();
    };

    private handleReplyWithoutUser = () => {
        Message.error('Sorry! If you want to write a comment, You have to Login!')
    };

    private handleNewDiscussionWithoutUser = () => {
        Message.error('Sorry! You have to login If you want to start new Discussion!');
    };
};