import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Lookups
import {
    getCategories, getCommentsBelongingToPost, getPostDataForPostPage
} from '../../../api/lookups';

// Transactions
import API from '../../../api/transactions';

//Components
import SideBar from '../../template/SideBar';
import PostDetails from '../../components/postPage/PostDetails';
import CommentRow from '../../components/postPage/Comment/Comment';
import CommentCreateForm from '../../components/createCommentPage/CommentCreateForm';
import Message from '../../components/common/Message';

type State = {
    post: {
        [key: string]: string
    }
    comments: {
        [key: string]: string
    }[]
    loading: boolean
    replyStyle: {
        [key: string]: string
    }
    replyStyleInit: {
        [key: string]: string
    }
    clickedComment: string
    showCreateCommentView: boolean
    quoteText: string
    quoteAuthorName: string
    user: User | null,
    categories: {
        [key: string]: string
    }[]
}

type Props = {
    user: User, params: any
}


export default class PostDetail extends React.Component<Props, State> {
    public static propTypes = {
        user: PropTypes.object.isRequired, params: PropTypes.object.isRequired,
    };

    state = {
        post: {},
        comments: [],
        categories: [],
        postUser: undefined,
        loading: false,
        replyText: {},
        replyStyle: { width: '0', height: '0' },
        replyStyleInit: { display: 'none' },
        clickedComment: '',
        showCreateCommentView: false,
        quoteText: '',
        quoteAuthorName: '',
        user: null,
    };

    render() {
        const { user } = this.props;
        const {
            post, comments, postUser, clickedComment, replyStyle, replyStyleInit, quoteText, quoteAuthorName, loading, showCreateCommentView, categories
        } = this.state;
        return (<div>
            <div className="post-page">
                <div className="content">
                    <div className="container">
                        <div className="left">
                            {/*<SideBar*/ }
                            {/*    page="post"*/ }
                            {/*    {...{ categories, user }}*/ }
                            {/*    respond={this.handleReplyClick}*/ }
                            {/*    clearReply={this.clearReply}*/ }
                            {/*/>*/ }
                        </div>
                        <div className="right post-container">
                            <PostDetails { ...post } { ...{ postUser } } />
                            <div
                                className="post-title forum-header"
                                style={ { marginTop: '20px' } }
                            >
                                <h2>{ comments.length || 0 } Responses </h2>
                            </div>
                            <div className="comments-wrapper">
                                { comments.map((comment, index) => (<CommentRow
                                    key={ index.toString() }
                                    { ...comment }
                                    { ...{ clickedComment, replyStyle, replyStyleInit, index } }
                                    addQuoteToComment={ this.addQuoteToComment }
                                    handleQuoteClick={ this.handleQuoteClick }
                                />)) }
                            </div>
                            <div>
                                { showCreateCommentView && (<CommentCreateForm
                                        { ...user }
                                        { ...{ quoteText, quoteAuthorName, loading } }
                                        createComment={ this.createComment }
                                    />) }
                            </div>
                        </div>
                        <div className="fl_c"/>
                    </div>
                </div>
            </div>
            <div
                style={ { height: '20px', marginTop: '-50px' } }
                ref={ this.respondDiv }
            />
        </div>);
    }

    public componentDidMount() {
        this.getScreenData();
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.comClick);
        document.removeEventListener('keydown', this.escClick);
        //Setup Flag to know is component Unmounted
        this.isUnmounted = true;
    }

    private isUnmounted: boolean = false;
    private respondDiv: React.RefObject<HTMLDivElement> = React.createRef();

    private getScreenData = async () => {
        window.scrollTo(0, 0);
        document.addEventListener('click', this.comClick);
        document.addEventListener('keydown', this.escClick);

        const postId = this.getPostId();

        const [postObj, comments, categories] = await Promise.all([getPostDataForPostPage(postId), getCommentsBelongingToPost(postId), getCategories()]);

        const { postUser, post } = postObj;

        this.setState({ post, comments, categories });
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
            Message.error(`Comment Can't be empty!!`);

            this.setState({
                showCreateCommentView: false,
            });
            window.scrollTo(0, 0);
            return;
        }

        this.setState({ loading: true });

        const postId = this.getPostId();
        const {
            quoteText, quoteAuthorName
        } = this.state;
        const { user } = this.props;
        const comment = {
            created: Date.now(), postId, text, quoteText, quoteAuthorName, userId: user.uid,
        };

        const { error } = await API.createComment({ postId, comment, userId: user.uid });

        if (error) {
            Message.error('Creating The Comment Failed :( ')
            this.setState({ loading: false });
        } else {
            const comments = await getCommentsBelongingToPost(postId);
            if (!this.isUnmounted) {
                this.setState({
                    comments, showCreateCommentView: false, replyStyleInit: { display: 'none' }, loading: false,
                });
                Message.success('Congrats! You just Commented this Post!!!');
                window.scrollTo(0, 0);
            }
        }
    };

    // clearReply = () => {
    //     this.setState({ replyText: '' });
    // };

    handleReplyClick = (user) => {
        this.setState({
            user, showCreateCommentView: true,
        });
        // setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
    };

    handleQuoteClick = (clickedComment) => {
        this.setState({
            replyStyle: { width: '100%', height: '100%' }, replyStyleInit: { display: 'block' }, clickedComment,
        });
    };

    addQuoteToComment = ({ clickedComment, text, authorName }) => {
        if (!this.props.user) {
            const backButtonUrl = this.props.params.location.pathname;
            // FlashMessageHandler.create(
            //     'Sorry! If you want to write a comment, You have to Login!',
            //     'error',
            //     false,
            //     '/',
            //     backButtonUrl
            // );
            // TODO: Redirect to login?
            // this.setState({ redirect: true });
            window.scrollTo(0, 0);
        } else {
            if (!this.isUnmounted) {
                this.setState({
                    showCreateCommentView: true, quoteText: text, quoteAuthorName: authorName, replyStyleInit: { display: 'none' }
                });
                // setTimeout(() => this.respondDiv.scrollIntoView({ behavior: 'smooth' }), 200);
            }
        }
    };

    // displayFlashMessageIfItSet = () => {
    //     if (this.state.displayFlashMessage) {
    //         setTimeout(() => {
    //             this.setState({ displayFlashMessage: false });
    //             FlashMessageHandler.reset();
    //         }, 2500);
    //         return (<FlashMessage {...this.state.flashMessage} />);
    //     }
    // };

    comClick = (e) => {
        if (e.target.classList.value === 'container' || e.target.classList.value === 'content') {
            this.setState({ replyStyleInit: { display: 'none' } });
        }
    };

    escClick = (e) => {
        if (e.keyCode === 27) {
            this.setState({ replyStyleInit: { display: 'none' } });
        }
    };
}

