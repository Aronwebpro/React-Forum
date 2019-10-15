import * as React from 'react';
import PropTypes from 'prop-types';

// React router
import { Redirect, withRouter } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

// Api
import API from '../../../api/transactions';

// Lookups
import { getCategories } from '../../../api/lookups';

// Components
import SideBar from '../../template/SideBar/index';
import Message from '../../components/common/Message';

// @types
type Props = RouteChildrenProps & {
    user: User
}

type State = {
    categories: any[] //TODO:
}

class CreatePost extends React.Component<Props, State> {
    public static propTypes = {
        user: PropTypes.object
    };

    public readonly state = {
        topics: [],
        loading: false,
        categories: [],
    };

    render() {
        const { user } = this.props;
        const { categories } = this.state;
        return (
            <div id="home">
                <div className="container">
                    <div className="left">
                        <SideBar page="new" {...{ user, categories }}/>
                    </div>
                    <div className="right post-container">
                        <div className="post-title forum-header">
                            <h2>New Discussion</h2>
                        </div>
                        <div className="full-post new-post-body">
                            <form>
                                <label htmlFor=""><h3>Title:</h3></label>
                                <input
                                    type="text"
                                    name="title"
                                    ref={ this.title}
                                />
                                <div className="category-select">
                                    <label htmlFor=""><h3>Category</h3></label>
                                    <select
                                        name="category"
                                        id=""
                                        ref={this.category}
                                    >
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
                                    <select
                                        name="category"
                                        id=""
                                        ref={this.type}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="announcement">Announcement</option>
                                        <option value="question">Question</option>
                                        <option value="general">General</option>
                                    </select>
                                </div>
                                <label htmlFor=""><h3>Text:</h3></label>
                                <textarea
                                    name="Text"
                                    id=""
                                    cols={30}
                                    rows={10}
                                    ref={this.text}
                                />
                            </form>
                            <button className="btn" onClick={this.createPost} style={{ marginTop: '20px' }}>Post</button>
                        </div>
                    </div>
                </div>
                <div className="fl_c"/>
            </div>
        );
    }

    public async componentDidMount() {
        const categories = await getCategories();
        if (!this.isUnmount) {
            this.setState({ categories });
        }
    };

    componentWillUnmount() {
        this.isUnmount = true;
    }

    private isUnmount: boolean = false;
    private title: React.RefObject<HTMLInputElement> = React.createRef();
    private text: React.RefObject<HTMLTextAreaElement> = React.createRef();
    private category: React.RefObject<HTMLSelectElement> = React.createRef();
    private type: React.RefObject<HTMLSelectElement> = React.createRef();

    //This method creates new PostDetail, updates Posts Count, Creates new Flash Message in localStorage
    createPost = async () => {
        const { uid } = this.props.user;
        const date = Date.now();
        const categoryId = this.category.current &&
            this.category.current.value.replace(/\s/g, '').toLowerCase();

        // TODO: Handle Empty Values

        // Construct post
        const post = {
            category: this.category.current && this.category.current.value,
            categoryId: categoryId,
            created: date,
            lastReply: date,
            lastUserId: uid,
            repliesCount: 0,
            text: this.text.current && this.text.current.value,
            title: this.title.current && this.title.current.value,
            type: this.type.current && this.type.current.value,
            userId: uid,
        };

        const { error, result } = await API.createPost({ post });

        if (error) {
            Message.error('Creating Post Failed :(');
            Message.error(error);
        } else {
            Message.success('Congrats! Your Post was Created!');

            // Redirect to New Post Page
            const { history } = this.props;
            history.push(`/post/${result.postId}`);
        }
    };
}

export default withRouter(CreatePost);
