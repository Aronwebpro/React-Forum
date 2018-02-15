import React, { Component } from 'react';
import Header from '../../template/header/Header';
import Footer from '../../template/footer/Footer';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import categories from '../../../categories.json';

//Data
import base from '../../../base';

class Post extends Component {
	constructor(props) {
		super(props);
		this.respond = this.respond.bind(this);
		this.respondForm = this.respondForm.bind(this);
		this.post = this.post.bind(this);
		this.Id = this.props.params.params.postId;
		const defaultState = { 
					post: {},
					user: props.user
				};
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
	componentWillMount() {
		this.ref = base.bindToState('topics', {
			context: this,
			state: 'post',
			queries: {
				orderByKey: 'topics',
				equalTo: this.Id
			}
		});
	}
	post() {

	}
	respond(user) {
		this.setState({
			respond: true,
			user: user
		});
	}
	respondForm() {

		if (this.state.respond === true ) {
			return ( 
				<div className="full-post" style={ {marginTop:'20px'} }>
					<div className="post">
									<div className="full-post new-post-body">
										<form>
											<label htmlFor=""><h3>Title:</h3></label>
											<input type="text" name="title"/>
											<div className="category-select">
												<label htmlFor=""><h3>Category</h3></label>
												<select name="category" id="">
													<option value="">Select Category</option>
													<option value="Board Games">Board Games</option>
													<option value="Card Games">Card Games</option>
													<option value="PC Games">PC Games</option>
													<option value="Console Games">Console Games</option>
													<option value="Handheld Games">Handheld Gamess</option>
												</select>
											</div>
											<label htmlFor=""><h3>Text:</h3></label>
											<textarea name="" id="" cols="30" rows="10"></textarea>
										</form>
										<button onClick={ this.post } className="btn" style={ {marginTop: '20px'} } >Post</button>
									</div>
					</div>
					<div className="author-info">
						<img src={this.props.user.authorAvatar} alt=""/>
						<p>{this.props.user.authorName}</p>
					</div>
					<div className="fl_c" />
				</div> 
				);
		}
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

		const { isLoggedIn }= this.props;
		return (
			<div>
				<Header />
				<div className="content">
					<div className="content">
						<div className="container">
							<div className="left">
								<SearchFilter categories={categories} page="post" isLoggedIn={ isLoggedIn } respond={ this.respond }/>
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
										<p>Created: {createdDate}</p>
									</div>
									<div className="fl_c" />
								</div>
								<div className="post-title forum-header" style={ {marginTop:'20px'} }>
									<h2>Responses 0</h2>
								</div>
								<div>
									{ this.respondForm() }
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
