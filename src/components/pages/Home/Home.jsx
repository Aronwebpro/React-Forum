import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
//User Messages
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../utils/FlashMessageHandler';
//Api
import {getPosts, getPostByCategory, getCategories} from '../../../api/lookups.js';
//Components
import SideBar from '../../template/SideBar';
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
    };

    render() {
        const {posts, categories} = this.state;
        const {user} = this.props;
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div id="home">
                    <div className="left">
                        <SideBar page="home" {...{user, categories}} />
                    </div>
                    <div className="right">
                        <div className="forum">
                            <div className="forum-header">
                                <div className="forum-title">
                                    <h2>Recent Discussions</h2>
                                </div>
                                <div ref={input => (this.arrow = input)} className="arrors"
                                     onClick={() => this.expand(this)}>
                                    <div className="leftArrow"/>
                                    <div className="rightArrow"/>
                                </div>
                            </div>
                            <div className="fl_c"/>
                            <div ref={input => (this.forumContent = input)} className="forum-content">
                                <div ref={input => (this.forumContentInner = input)} className="forum-coontent-inner">
                                    {posts.length > 0 ? posts.map(post => (
                                        <Post {...post} key={post.title} />
                                    )) : (
                                        <Spinner/>
                                    )}
                                </div>
                            </div>
                            <div className="load-more-wrapper">
                                {!this.state.hideLoadBtn && (
                                    <button className="btn" onClick={this.handleLoadMoreClick}>Load More</button>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fl_c"></div>
            </div>
        )
    }

    async componentDidMount() {
        //Retrieve Topics from DB
        this.getScreenData();
        const flashMessage = FlashMessageHandler.fetch();
        if (flashMessage.msg && !this.isUnmount) {
            this.setState({displayFlashMessage: true, flashMessage});
        }
    }

    componentDidUpdate() {
        window.addEventListener('load', () => {
            this.forumContent.style.height = this.forumContentInner.clientHeight + 'px';
        });
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Retrieve Topics and categories from DB
    getScreenData = async (limit) => {
        const {params} = this.props;
        if (params && params.match) {
            const {category} = params.match.params;
            const [postsObj, categories] = await Promise.all([
                getPostByCategory(category, limit),
                getCategories()
            ]);
            const {posts, nextPostId} = postsObj;
            if (!this.isUnmount) {
                this.setState({posts, categories, hideLoadBtn: !nextPostId});
            }
        } else {
            const {posts, nextPostId} = await getPosts(limit);
            const categories = await getCategories();
            if (!this.isUnmount) {
                this.setState({posts, categories, hideLoadBtn: !nextPostId});
            }
        }
    };

    //Expand Widget Header on Click
    expand = (component) => {
        if (component.forumContent.clientHeight > 0) {
            component.forumContent.style.height = 0 + 'px';
            component.changeBtn('down');
        } else {
            component.forumContent.style.height = component.forumContentInner.clientHeight + 'px';
            component.changeBtn();
        }
    };

    //Change Header arrow position up or down
    changeBtn = (position) => {
        if (position === 'down') {
            this.arrow.style.transform = 'rotateZ(-90deg) translate(7%, 40%)';
        } else {
            this.arrow.style.transform = 'rotateZ(0deg) translate(20%, 0%)';
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
                this.setState({displayFlashMessage: false});
                FlashMessageHandler.reset();
            }, 2500);
            return (<FlashMessage {...this.state.flashMessage} />)
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
