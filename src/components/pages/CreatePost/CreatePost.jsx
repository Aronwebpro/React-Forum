import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

//Api
import API from '../../../api/transactions';

//Components
import SideBar from '../../template/SideBar/';

//Flash Message Handlers
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';

class CreatePost extends Component {
    state = {
        topics: [],
        redirect: false,
        redirectUrl: '',
        flashMessage: {},
        displayFlashMessage: false,
        loading: false,
    };

    render() {
        const {user} = this.props;
        const {redirect, redirectUrl} = this.state;
        return !user || redirect ? (
            <Redirect to={redirectUrl || '/'} />
        ) : (
            <div id="home">
                <div className="container">
                    {this.displayFlashMessageIfItSet()}
                    <div className="left">
                        <SideBar page="new" {...{user}}/>
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
                            <button className="btn" onClick={this.createPost} style={{marginTop: '20px'}}>Post</button>
                        </div>
                    </div>

                </div>
                <div className="fl_c"></div>
            </div>
        )
    }

    //This method creates new PostDetail, updates Posts Count, Creates new Flash Message in localStorage
    createPost = async () => {
        const date = Date.now();
        const {uid} = this.props.user;
        const categoryId = this.category.value.replace(/\s/g, '').toLowerCase();

        //Data object to save to DB
        const post = {
            category: this.category.value,
            categoryId: categoryId,
            created: date,
            lastReply: date,
            lastUserId: uid,
            repliesCount: 0,
            text: this.text.value,
            title: this.title.value,
            type: this.type.value,
            userId: uid,
        };

        const {error, result} = await API.createPost({post});
        if (error) {
            this.setState({
                displayFlashMessage: true,
                flashMessage: {msg: 'Creating PostDetail Failed :( ', status: 'error'}
            });
        } else {
            //Create Flash message in DB Flash
            FlashMessageHandler.create('Congrats! Your PostDetail is Created!', 'success');

            //Redirect to New PostDetail
            this.setState({url: '/PostDetail/' + result.postId, redirect: true});
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
}

CreatePost.propTypes = {
    user: PropTypes.object
}

export default CreatePost;
