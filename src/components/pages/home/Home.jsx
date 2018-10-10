import React, {Component} from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import Post from '../../mixins/Post/Post';
import {Redirect} from 'react-router';
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';
import PropTypes from 'prop-types';
import {getPosts, getPostByCategory, getSinglePost} from '../../../api/lookups.js';

class Home extends Component {
    state = {
        posts: [],
        redirect: false,
        flashMessage: {},
        displayFlashMessage: false,
        hideLoadBtn: true,
        amount: 10,
    };

    render() {
        const {posts} = this.state;
        const {isLoggedIn} = this.props;
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div id="home">
                    <div className="left">
                        <SearchFilter page="home" isLoggedIn={isLoggedIn}/>
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
                                    {posts.map(post => (
                                        <Post {...post} key={post.title} />
                                    ))}
                                </div>
                            </div>
                            <div className="load-more-wrapper">
                                {!this.state.hideLoadBtn && (
                                    <button className="btn" onClick={this.loadMoreTopics}>Load More</button>)}
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
        this.getPosts();
        const flashMessage = FlashMessageHandler.fetch();
        if (flashMessage.msg) this.setState({displayFlashMessage: true, flashMessage});
    }

    componentDidUpdate() {
        window.addEventListener('load', () => {
            this.forumContent.style.height = this.forumContentInner.clientHeight + 'px';
        });
    }

    //Retrieve Topics from DB
    getPosts = async (limit) => {
        const {params} = this.props;
        if (params) {
            const {category} = params.params;
            const {posts, nextPostId} = await getPostByCategory(category, limit);
            this.setState({posts, hideLoadBtn: !nextPostId});
        } else {
            const {posts, nextPostId} = await getPosts(limit);
            this.setState({posts, hideLoadBtn: !nextPostId});
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

    //Change header arrow position up or down
    changeBtn = (position) => {
        if (position === 'down') {
            this.arrow.style.transform = 'rotateZ(-90deg) translate(7%, 40%)';
        } else {
            this.arrow.style.transform = 'rotateZ(0deg) translate(20%, 0%)';
        }
    };

    convertDate = (unixTime, type) => {
        var date = new Date(unixTime);
        var returnString;
        if (type === 'date') {
            returnString = date.getMonth() + 1 + '/' + date.getDate() + ' ' + date.getFullYear();
        } else if (type === 'time') {
            returnString = date.getHours() + ':' + date.getMinutes();
        }
        return returnString;
    };

    loadMoreTopics = () => {
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
    isLoggedIn: PropTypes.bool.isRequired,
    params: PropTypes.object
}

export default Home;