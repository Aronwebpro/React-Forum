import * as React from 'react';
import * as  PropTypes from 'prop-types';

export default class Profile extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            authorName: PropTypes.string.isRequired,
            authorAvatar: PropTypes.string.isRequired,
        }),
        params: PropTypes.object
    };

    public render() {
        return (
            <div className="container">
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Friends List</h2>
                    </div>
                    <div
                        ref={this.forumContent}
                        className="forum-content"
                    >
                        <div
                            ref={this.forumContentInner}
                            className="forum-content-inner"
                        >
                            You don't have any friends :/
                        </div>
                    </div>
                    <div className="fl_c"/>
                </div>
            </div>
        );
    }

    public isUnmount: boolean = false;

    public componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    public componentWillUnmount() {
        this.isUnmount = true;
    }

    private forumContent: React.RefObject<HTMLDivElement> = React.createRef();
    private forumContentInner: React.RefObject<HTMLDivElement> = React.createRef();
}
