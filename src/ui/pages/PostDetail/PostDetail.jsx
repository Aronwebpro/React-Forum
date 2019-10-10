import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Lookups
import {
    getCategories,
    getCommentsBelongingToPost,
    getPostDataForPostPage
} from '../../../api/lookups';

// Transactions
import API from '../../../api/transactions';

//Components
import SideBar from '../../template/SideBar/index';
import PostDetails from '../../components/postPage/PostDetails/index';
import CommentRow from '../../components/postPage/Comment/Comment';
import CommentCreateForm from '../../components/createCommentPage/CommentCreateForm/index';

//TODO:
import { FlashMessage } from '../../components/common/FlashMessage/FlashMessage';
import { FlashMessageHandler } from '../../../lib/utils/FlashMessageHandler';

export default class PostDetail extends React.Component {
    state = {
        post: {},
        comments: [],
        categories: [],
        postUser: undefined,
        loading: false,
        replyText: {},
        replyStyle: { width: '0', height: '0' },
        replyStyleInit: { display: 'none' },
        redirect: false,
        flashMessage: {},
        displayFlashMessage: false,
        clickedComment: '',
        showCreateCommentView: false,
        quoteText: '',
        quoteAuthorName: '',

    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login"/>;
        }
        if (this.state.flash) {
            setTimeout(() => {
                this.setState({ flash: false });
            }, 3500);
        }
        const { user } = this.props;
        const { post, comments, postUser, clickedComment, replyStyle, replyStyleInit, quoteText, quoteAuthorName, loading, showCreateCommentView, categories } = this.state;
        return (
            <div>
                <div className="post-page">
                    <div className="content">
                        <div className="container">
                            <div className="left">
                                <SideBar
                                    page="post"
                                    {...{ categories, user }}
                                    respond={this.handleReplyClick}
                                    clearReply={this.clearReply}
                                    flash={this.flash}

                                />
                            </div>
                            <div className="right post-container">
                                {this.displayFlashMessageIfItSet()}
                                <PostDetails {...post} {...{ postUser }} />
                                <div className="post-title forum-header" style={{ marginTop: '20px' }}>
                                    <h2>{comments.length || 0} Responses </h2>
                                </div>
                                <div className="comments-wrapper">
                                    {comments.map((comment, index) => (
                                        <CommentRow
                                            key={index.toString()}
                                            {...comment}
                                            {...{ clickedComment, replyStyle, replyStyleInit, index }}
                                            addQuoteToComment={this.addQuoteToComment}
                                            handleQuoteClick={this.handleQuoteClick}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {showCreateCommentView && (
                                        <CommentCreateForm
                                            {...user}
                                            {...{ quoteText, quoteAuthorName, loading }}
                                            createComment={this.createComment}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="fl_c"/>
                        </div>
                    </div>
                </div>
                <div
                    style={{ height: '20px', marginTop: '-50px' }}
                    ref={input => this.respondDiv = input}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getScreenData();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.comClick);
        document.removeEventListener('keydown', this.escClick);
        //Setup Flag to know is component Unmounted
        this.isUnmounted = true;
    }

    getScreenData = async () => {
        window.scrollTo(0, 0);
        document.addEventListener('click', this.comClick);
        document.addEventListener('keydown', this.escClick);

        const postId = this.getPostId();

        const [postObj, comments, categories] = await Promise.all([
            getPostDataForPostPage(postId),
            getCommentsBelongingToPost(postId),
            getCategories()
        ]);

        const { postUser, post } = postObj;

        const flashMessage = FlashMessageHandler.fetch();

        if (flashMessage.msg) {
            if (!this.isUnmounted) {
                this.setState({ post, postUser, comments, categories, flashMessage, displayFlashMessage: true });
            }
        } else {
            if (!this.isUnmounted) {
                this.setState({ post, postUser, comments, categories });
            }
        }
    };

    getPostId = () => {
        const { params } = this.props;
        if (params) {
            const { pathname } = params.location;
            return pathname.split('/post/').join('');
        }
    };

    createComment = async (text) => {
        if (!text) {
            this.setState({
                displayFlashMessage: true,
                flashMessage: { msg: 'Comment Can\'t be empty!!', status: 'error' },
                showCreateCommentView: false,
            });
            window.scrollTo(0, 0);
            return;
        }

        this.setState({ loading: true });

        const created = Date.now();
        const postId = this.getPostId();
        const { quoteText, quoteAuthorName } = this.state;
        const { user } = this.props;
        const comment = {
            postId,
            created,
            text,
            quoteText,
            quoteAuthorName,
            userId: user.uid,
        };
        const { error } = await API.createComment({ postId, comment, userId: user.uid });

        if (error) {
            this.setState({
                displayFlashMessage: true,
                flashMessage: { msg: 'Creating The Comment Failed :( ', status: 'error', loading: false }
            });
        } else {
            const comments = await getCommentsBelongingToPost(postId);
            if (!this.isUnmounted) {
                this.setState({
                    comments,
                    displayFlashMessage: true,
                    flashMessage: { msg: 'Congrats! You just Commented this Post!!! ', status: 'success' },
                    showCreateCommentView: false,
                    replyStyleInit: { display: 'none' },
                    loading: false,
                });
                window.scrollTo(0, 0);
            }
        }
    };

    clearReply = () => {
        this.setState({ replyText: '' });
    };

    handleReplyClick = (user) => {
        this.setState({
            user,
            showCreateCommentView: true,
        });
        setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
    };

    handleQuoteClick = (clickedComment) => {
        this.setState({
            replyStyle: { width: '100%', height: '100%' },
            replyStyleInit: { display: 'block' },
            clickedComment,
        });
    };

    addQuoteToComment = ({ clickedComment, text, authorName }) => {
        if (!this.props.user) {
            const backButtonUrl = this.props.params.location.pathname;
            FlashMessageHandler.create(
                'Sorry! If you want to write a comment, You have to Login!',
                'error',
                false,
                '/',
                backButtonUrl
            );

            this.setState({ redirect: true });
            window.scrollTo(0, 0);
        } else {
            if (!this.isUnmounted) {
                this.setState({
                    showCreateCommentView: true,
                    quoteText: text,
                    quoteAuthorName: authorName,
                    reply: false,
                    replyStyleInit: { display: 'none' }
                });
                setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
            }
        }
    };

    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                this.setState({ displayFlashMessage: false });
                FlashMessageHandler.reset();
            }, 2500);
            return (<FlashMessage {...this.state.flashMessage} />);
        }
    };

    comClick = (e) => {
        if (e.target.classList.value === 'container' || e.target.classList.value === 'content') {
            this.setState({ reply: false, replyStyleInit: { display: 'none' } });
        }
    };

    escClick = (e, obj) => {
        if (e.keyCode === 27) {
            this.setState({ reply: false, replyStyleInit: { display: 'none' } });
        }
    };
}

PropTypes.Post = {
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

