import React from 'react';
import PropTypes from 'prop-types';

// Router
import { Redirect } from 'react-router-dom';
import { RouteChildrenProps, RouteProps } from 'react-router';

// Api
import {
    getPosts,
    getPostByCategory,
    getCategories
} from '../../../api/lookups.js';

// Utils
import { get } from '../../../lib/utils';

// Components
import Post from '../../../ui/components/Post/Post';
import Spinner from '../../../ui/components/Spinner/index';

// @types
type State = {
    posts: Post[]
    categories: string[]
    showLoadButton: boolean
    amount: number
    loading: boolean
}

type Props = RouteProps;

export default class Home extends React.Component<Props, State> {
    static propTypes = {
        user: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            authorName: PropTypes.string.isRequired,
            authorAvatar: PropTypes.string.isRequired,
        }),
        params: PropTypes.object
    };

    public readonly state = {
        posts: [],
        categories: [],
        showLoadButton: false,
        amount: 10,
        loading: true,
    };

    public render() {
        const {
            posts,
            loading,
            showLoadButton,
        } = this.state;

        return (
            <div className="container">
                <div className="forum">
                    <div className="forum-header">
                        <div className="forum-title">
                            <h2>Recent Discussions</h2>
                        </div>
                    </div>
                    <div className="fl_c"/>
                    <div className="forum-content">
                        <div className="forum-content-inner">
                            {loading ? (
                               <div className="loader-container">
                                   <Spinner screenWidth />
                               </div>
                            ) : (
                                <div>
                                    {posts.length ? (
                                        posts.map((post, index) => (
                                            <Post {...post} key={index.toString()}/>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', fontSize: '2em' }}>
                                            No Posts
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="load-more-wrapper">
                        {showLoadButton && (
                            <button className="btn" onClick={this.handleLoadMoreClick}>Load More</button>)}
                    </div>
                </div>
            </div>
        );
    }

    public async componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }

        // Fetch Topics from api
        await this.handleScreenData();
    }

    public async componentDidUpdate(prevProps) {
        if (get(prevProps, 'params.match.url') !== get(this.props, 'params.match.url')) {
            window.scrollTo(0, 0);
            await this.handleScreenData();
        }
    }

    public componentWillUnmount() {
        this.isUnmount = true;
    }

    private isUnmount: boolean = false;

    // Fetch posts and categories from API
    private handleScreenData = async (limit: number = 10) => {
        const { params } = this.props;
        //
        if (params && params.match) {
            const { category } = params.match.params;
            const [postsObj, categories] = await Promise.all([
                getPostByCategory(category, limit),
                getCategories()
            ]);
            const { posts, nextPostId } = postsObj;

            if (!this.isUnmount) {
                this.setState({
                    posts,
                    categories,
                    showLoadButton: !!(nextPostId),
                    loading: false,
                });
            }
        } else {
            const { posts, nextPostId } = await getPosts(limit);
            const categories = await getCategories();

            if (!this.isUnmount) {
                this.setState({
                    posts,
                    categories,
                    showLoadButton: !!(nextPostId),
                    loading: false,
                });
            }
        }
    };

    private handleLoadMoreClick = (): void => {
        // TODO: build functionality to load more posts
        const amount = this.state.amount + 10;
        //this.getPosts(amount);
        this.setState({ amount });
    };
}

