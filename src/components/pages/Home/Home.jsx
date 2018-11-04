import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
//User Messages
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../utils/FlashMessageHandler';
//Api
import {getPosts, getPostByCategory, getCategories} from '../../../api/lookups.js';
//Components
import Post from '../../mixins/Post/Post';
import Spinner from '../../mixins/Spinner';

export default class Home extends React.Component {
    state = {
        posts: [],
        categories: [],
        redirect: false,
        flashMessage: {},
        displayFlashMessage: false,
        hideLoadBtn: true,
        amount: 10,
        empty: false,
        postsLoading: false,
    };

    render() {
        const {posts, empty, postsLoading} = this.state;
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div className="forum">
                    <div className="forum-header">
                        <div className="forum-title">
                            <h2>Recent Discussions</h2>
                        </div>
                    </div>
                    <div className="fl_c"/>
                    <div ref={input => (this.forumContent = input)} className="forum-content">
                        <div ref={input => (this.forumContentInner = input)} className="forum-content-inner">
                            {!postsLoading && posts.length > 0 ? posts.map(post => (
                                <Post {...post} key={post.title}/>
                            )) : (
                                <div>
                                    {empty ? (
                                        <div style={{textAlign: 'center', fontSize: '2em'}}>
                                            No Posts
                                        </div>
                                    ) : (
                                        <Spinner/>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="load-more-wrapper">
                        {!this.state.hideLoadBtn && (
                            <button className="btn" onClick={this.handleLoadMoreClick}>Load More</button>)}
                    </div>
                </div>
            </div>
        )
    }

    async componentDidMount() {
        //Retrieve Topics from DB
        this.getScreenData();
        const flashMessage = FlashMessageHandler.fetch();
        if (flashMessage.msg && !this.isUnmount) {
            if (!this.isUnmount) {
                this.setState({displayFlashMessage: true, flashMessage});
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.params &&
            prevProps.params &&
            this.props.params.match.url &&
            prevProps.params.match.url &&
            this.props.params.match.url !== prevProps.params.match.url ||
            this.props.params !== prevProps.params
        ) {

            this.getScreenData();
        }

    }

    componentWillUnmount() {
        this.isUnmount = true;
    }
    
    //Retrieve Topics and categories from DB
    getScreenData = async (limit) => {
        if (!this.isUnmount) {
            this.setState({postsLoading: true});
        }

        const {params} = this.props;
        if (params && params.match) {
            const {category} = params.match.params;
            const [postsObj, categories] = await Promise.all([
                getPostByCategory(category, limit),
                getCategories()
            ]);
            const {posts, nextPostId} = postsObj;
            if (!this.isUnmount) {
                this.setState({posts, categories, hideLoadBtn: !nextPostId, empty: posts.length === 0, postsLoading: false});
            }
        } else {
            const {posts, nextPostId} = await getPosts(limit);
            const categories = await getCategories();
            if (!this.isUnmount) {
                this.setState({posts, categories, hideLoadBtn: !nextPostId, postsLoading: false});
            }
        }
    };

    handleLoadMoreClick = () => {
        const amount = this.state.amount + 10;
        this.getPosts(amount);
        this.setState({amount});
    };

    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                if(!this.isUnmount) {
                    this.setState({displayFlashMessage: false});
                }
                FlashMessageHandler.reset();
            }, 2500);
            return <FlashMessage {...this.state.flashMessage} />
        }
    };
}

Home.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
