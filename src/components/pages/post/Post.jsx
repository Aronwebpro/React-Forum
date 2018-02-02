import React, { Component } from 'react';
import Header from '../../template/header/Header';
import Footer from '../../template/footer/Footer';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import categories from '../../../categories.json';

class Post extends Component {
	constructor(props) {
		super(props);
		this.Id = this.props.params.postId;
		const defaultState = { post: {} };
		defaultState.post[this.Id] = {
			topicId: '',
			title: '',
			authorAvatar: '',
			authorId: '',
			authorName: '',
			category: '',
			created: 'loading',
			text: ''
		};
		this.state = defaultState;
	}

	render() {
		const post = this.state.post[this.Id];
		let createdDate = '';
		let createdTime = '';
		if (post.created !== 'loading' && post && post.hasOwnProperty('created')) {
			let date = new Date(post.created);
			createdDate = date.getMonth() + 1 + '/' + date.getDate() + ' ' + date.getFullYear();
			createdTime = date.getHours() + ':' + date.getMinutes();
		}
		return (
			<div>
				<Header />
				<div className="content">
					<div className="content">
						<div className="container">
							<div className="left">
								<SearchFilter categories={categories} page="post" />
							</div>
							<div className="right post-container">
								<div className="post-title forum-header">
									<h2>{post.title}</h2>
								</div>
								<div className="full-post">
									<div className="post">
										<div className="post-info">Topic: {post.category}</div>
										<p>{post.text}</p>
									</div>
									<div className="author-info">
										<img src={post.authorAvatar} alt=""/>
										<p>Author: {post.authorName}</p>
										<p>Created: {post.created}</p>
									</div>
									<div className="fl_c" />
								</div>
							</div>
							<div className="fl_c" />
						</div>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default Post;
