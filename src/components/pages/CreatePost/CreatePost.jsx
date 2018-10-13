import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';

//Api
import API from '../../../api/transactions';

//Components
import SideBar from '../../template/SideBar/';

//Flash Message Handlers
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

class CreatePost extends Component {
    constructor() {
        super();
        this.post = this.post.bind(this);
        this.displayFlashMessageIfItSet = this.displayFlashMessageIfItSet.bind(this);
        this.state = {topics: [], redirect: false, flashMessage: {}, displayFlashMessage: false};
    }
    state = {
        topics: [],
        redirect: false,
        flashMessage: {},
        displayFlashMessage: false,
        loading: false,
    };
    /*
    * This method creates new Post, updates Posts Count, Creates new Flash Message in localStorage
    */
    async post() {
        const date = Date.now();
        const {uid} = this.props.user;
        const categoryId = this.category.value.replace(/\s/g, '').toLowerCase();

        //Data object to save to DB
        const post = {
            category: this.category.value,
            categoryId: categoryId,
            created:  date,
            lastReply: date,
            lastUserId: uid,
            repliesCount: 0,
            text: this.text.value,
            title: this.title.value,
            type: this.type.value,
            userId: uid,
        };

        const {error, result} = await API.createPost(post);
        if (error) {
            this.setState({displayFlashMessage: true, flashMessage: {msg: 'Creating Post Failed :( ', status: 'error'} });
        } else {
            //Create Flash message in DB Flash
            FlashMessageHandler.create('Congrats! Your Post is Created!', 'success');

            //Redirect to New Post
            this.setState({url: '/post/' + result.postId, redirect: true});
        }

    }

    displayFlashMessageIfItSet = () => {
        const {displayFlashMessage, flashMessage} = this.state;
        if (displayFlashMessage) {
            setTimeout(() => {
                this.setState({displayFlashMessage: false});
                FlashMessageHandler.reset();
            }, 4000);
            return (<FlashMessage {...flashMessage} />)
        }
    };

    render() {
        const {isLoggedIn} = this.props;
        if (this.state.redirect === true) {
            return <Redirect to={this.state.url}/>
        }
        if (isLoggedIn) {
            return (
                <div id="home">
                    <div className="container">
                        {this.displayFlashMessageIfItSet()}
                        <div className="left">
                            <SideBar page="new" isLoggedIn={isLoggedIn}/>
                        </div>
                        <div className="right post-container">
                            <div className="post-title forum-header">
                                <h2>New Discussion</h2>
                            </div>
                            <div className="full-post new-post-body">
                                <form>
                                    <label htmlFor=""><h3>Title:</h3></label>
                                    <input type="text" name="title" ref={(input => this.title = input)}/>
                                    <div className="category-select">
                                        <label htmlFor=""><h3>Category</h3></label>
                                        <select name="category" id="" ref={(input => this.category = input)}>
                                            <option value="">Select Category</option>
                                            <option value="Board Games">Board Games</option>
                                            <option value="Card Games">Card Games</option>
                                            <option value="PC Games">PC Games</option>
                                            <option value="Console Games">Console Games</option>
                                            <option value="Handle Games">Handle Games</option>
                                        </select>
                                    </div>
                                    <div className="category-select">
                                        <label htmlFor=""><h3>Discussion Type</h3></label>
                                        <select name="category" id="" ref={(input => this.type = input)}>
                                            <option value="">Select Type</option>
                                            <option value="announcement">Announcement</option>
                                            <option value="question">Question</option>
                                            <option value="general">General</option>
                                        </select>
                                    </div>
                                    <label htmlFor=""><h3>Text:</h3></label>
                                    <textarea name="Text" id="" cols="30" rows="10"
                                              ref={(input => this.text = input)}></textarea>
                                </form>
                                <button className="btn" onClick={this.post} style={{marginTop: '20px'}}>Post</button>
                            </div>
                        </div>

                    </div>
                    <div className="fl_c"></div>

                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}

CreatePost.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object
}

export default CreatePost;
