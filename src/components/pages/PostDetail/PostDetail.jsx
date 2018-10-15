import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

//Api
import {getCommentsBelongingToPost, getPostDataForPostPage} from '../../../api/lookups';
import API from '../../../api/transactions';

//Components
import SideBar from '../../template/SideBar/';
import PostDetails from '../../mixins/PostDetails';
import CommentRow from '../../mixins/Comment/Comment';
import CommentCreateForm from '../../mixins/CommentCreateForm';

//TODO:
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

class CommentCreateFormView extends React.PureComponent {
    render() {
        const {authorAvatar, authorName, quoteText, quoteAuthorName, loading} = this.props;
            return (
                <div className="full-post" style={{marginTop: '50px'}}>
                    <div className="post">
                        <div className="full-post new-post-body">
                            {quoteText && (
                                <div><span className="theme-color_txt">Replying to...</span><br/>
                                <div className="quote">
                                    <p className="quote-authorName">{quoteAuthorName} said: </p>
                                    <p>"{quoteText}"</p></div>
                                </div>
                            )}
                            <form>
                                <label htmlFor=""><h2>Write a Comment:</h2></label>
                                <textarea name="" id="" cols="30" rows="10"
                                          ref={(input) => this.respText = input}/>
                            </form>
                            <button onClick={this.handleCreateCommentClick} className="btn" style={{marginTop: '20px'}}>Post</button>
                        </div>
                    </div>
                    <div className="author-info">
                        <img src={authorAvatar} alt=""/>
                        <p>Author: {authorName}</p>
                    </div>
                    <div className="fl_c"/>
                </div>
            );
        }
        handleCreateCommentClick = () => {
            const {createComment} = this.props;
            createComment(this.respText.value);
        }
}

export default class PostDetail extends React.Component {
    state = {
        post: {},
        comments: [],
        postUser: undefined,
        loading: false,
        replyText: {},
        replyStyle: {width: '0', height: '0'},
        replyStyleInit: {display: 'none'},
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
            return <Redirect to="/login"/>
        }
        if (this.state.flash) {
            setTimeout(() => {
                this.setState({flash: false});
            }, 3500);
        }
        const {user} = this.props;
        const {post, comments, postUser, clickedComment, replyStyle, replyStyleInit, quoteText, quoteAuthorName, loading, showCreateCommentView} = this.state;
        return (
            <div>
                <div className="post-page">
                    <div className="content">
                        <div className="container">
                            {this.displayFlashMessageIfItSet()}
                            <div className="left">
                                <SideBar
                                    page="post"
                                    user={user}
                                    respond={this.handleReplyClick}
                                    clearReply={this.clearReply}
                                    flash={this.flash}
                                />
                            </div>
                            <div className="right post-container">
                                <PostDetails {...post} {...{postUser}} />
                                <div className="post-title forum-header" style={{marginTop: '20px'}}>
                                    <h2>{comments.length || 0} Responses </h2>
                                </div>
                                <div className="comments-wrapper">
                                    {comments.map((comment, index) => (
                                        <CommentRow
                                            key={index.toString()}
                                            {...comment}
                                            {...{clickedComment, replyStyle, replyStyleInit, index}}
                                            addQuoteToComment={this.addQuoteToComment}
                                            handleQuoteClick={this.handleQuoteClick}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {showCreateCommentView && (
                                        <CommentCreateForm
                                            {...user}
                                            {...{quoteText, quoteAuthorName, loading}}
                                            createComment={this.createComment}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="fl_c"/>
                        </div>
                    </div>
                </div>
                <div style={{height: '20px', marginTop: '-50px'}} ref={input => this.respondDiv = input}></div>
            </div>

        );
    }

    componentDidMount() {
        this.getScreenData();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.comClick);
        document.removeEventListener('keydown', this.escClick);
    }

    getScreenData = async () => {

        document.addEventListener('click', this.comClick);
        document.addEventListener('keydown', this.escClick);

        const postId = this.getPostId();

        const [postObj, comments] = await Promise.all([
            getPostDataForPostPage(postId),
            getCommentsBelongingToPost(postId)
        ]);

        const {postUser, post} = postObj;

        const flashMessage = FlashMessageHandler.fetch();

        if (flashMessage.msg) {
            this.setState({post, postUser, comments, flashMessage, displayFlashMessage: true})
        } else {
            this.setState({post, postUser, comments});
        }
    };

    getPostId = () => {
        const {params} = this.props;
        if (params) {
            const {pathname} = params.location;
            return pathname.split('/post/').join('');
        }
    };

    createComment = async (text) => {
        if (!text) {
            this.setState({
                displayFlashMessage: true,
                flashMessage: {msg: 'Comment Can\'t be empty!!', status: 'error'},
                showCreateCommentView: false,
            });
            window.scrollTo(0, 0);
            return
        }

        this.setState({loading: true});

        const created = Date.now();
        const postId = this.getPostId();
        const {quoteText, quoteAuthorName} = this.state;
        const {user} = this.props;
        const comment = {
            postId,
            created,
            text,
            quoteText,
            quoteAuthorName,
            userId: user.uid,
        };
        const {error} = await API.createComment({postId, comment});

        if (error) {
            this.setState({
                displayFlashMessage: true,
                flashMessage: {msg: 'Creating The Comment Failed :( ', status: 'error', loading: false}
            });
        } else {
            const comments = await getCommentsBelongingToPost(postId);
            this.setState({
                comments,
                displayFlashMessage: true,
                flashMessage: {msg: 'Congrats! You just Commented this Post!!! ', status: 'success'},
                showCreateCommentView: false,
                replyStyleInit: {display: 'none'},
                loading: false,
            });
            window.scrollTo(0, 0);
        }
    };

    clearReply = () => {
        this.setState({replyText: ''});
    };

    handleReplyClick = (user) => {
        this.setState({
            user,
            showCreateCommentView: true,
        });
        setTimeout(() => this.respondDiv.scrollIntoView({behavior: 'smooth'}), 200);
    };

    handleQuoteClick = (clickedComment) => {
        this.setState({
            replyStyle: {width: '100%', height: '100%'},
            replyStyleInit: {display: 'block'},
            clickedComment,
        });
    };

    addQuoteToComment = ({clickedComment, text, authorName} ) => {
        if (!this.props.user) {
            const backButtonUrl = this.props.params.location.pathname;
            FlashMessageHandler.create(
                'Sorry! If you want to write a comment, You have to Login!',
                'error',
                false,
                '/',
                backButtonUrl
            );

            this.setState({redirect: true});
            window.scrollTo(0, 0);
        } else {
            this.setState({
                showCreateCommentView: true,
                quoteText: text,
                quoteAuthorName: authorName,
                reply: false,
                replyStyleInit: {display: 'none'}
            });
            //this.handleQuoteClick();
        }
    };

    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                this.setState({displayFlashMessage: false});
                FlashMessageHandler.reset();
            }, 2500);
            return (<FlashMessage {...this.state.flashMessage} />)
        }
    }

    comClick = (e) => {
        if (e.target.classList.value === 'container' || e.target.classList.value === 'content') {
            this.setState({reply: false, replyStyleInit: {display: 'none'}});
        }
    };

    escClick = (e, obj) => {
        if (e.keyCode === 27) {
            this.setState({reply: false, replyStyleInit: {display: 'none'}});
        }
    };
}

PropTypes.Post = {
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool
};

