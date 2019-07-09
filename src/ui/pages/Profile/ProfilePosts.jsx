import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//User Messages
import { FlashMessage } from '../../../ui/components/FlashMessage/FlashMessage';
import { FlashMessageHandler } from '../../../lib/utils/FlashMessageHandler';

//Components
import Post from '../../../ui/components/Post/Post';
import Spinner from '../../../ui/components/Spinner';

//Api
import { getPostBelongingToUser } from '../../../api/lookups.js';

export default class ProfilePosts extends React.Component {
    state = {
        redirect: false,
        postsLoading: false,
        empty: false,
        posts: [],
    };

    render() {
        const { redirect, postsLoading, empty, posts } = this.state;
        const { user } = this.props;

        return redirect ? (
            <Redirect to="/"/>
        ) : (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Your Posts</h2>
                    </div>
                    <div ref={input => (this.forumContent = input)} className="forum-content">
                        <div ref={input => (this.forumContentInner = input)} className="forum-content-inner">
                            {!postsLoading && posts.length > 0 ? posts.map(post => (
                                <Post {...post} key={post.title}/>
                            )) : (
                                <div>
                                    {empty ? (
                                        <div style={{ textAlign: 'center', fontSize: '2em' }}>
                                            No Posts
                                        </div>
                                    ) : (
                                        <Spinner/>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="fl_c"/>
                </div>
            </div>
        );
    }

    async componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        const { uid } = this.props.user;
        const { posts } = await getPostBelongingToUser(uid);
        if (!this.isUnmount) {
            this.setState({ posts, postsLoading: false });
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }


    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                if (!this.isUnmount) {
                    this.setState({ displayFlashMessage: false });
                }
                FlashMessageHandler.reset();
            }, 2500);
            return <FlashMessage {...this.state.flashMessage} />;
        }
    };
}

ProfilePosts.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
