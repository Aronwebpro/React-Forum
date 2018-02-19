import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import categories from '../../../categories.json';
import CommentRow from '../../mixins/commentrow/CommentRow';

//Database
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
					user: props.user,
					comments: {}
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
		this.postRef = base.bindToState('topics', {
			context: this,
			state: 'post',
			queries: {
				orderByKey: 'topics',
				equalTo: this.Id
			}
		});
		this.commentRef = base.bindToState('comments', {
			context: this,
			state: 'comments',
			queries: {
				orderByChild: 'topicId',
				equalTo: this.Id
			}
		});
	}
	post() {
		const time = Date.now();
		const input = {
			text: this.respText.value,
			authorAvatar: this.props.user.authorAvatar,
			authorName: this.props.user.authorName,
			topicId:this.Id,
			posted: time,
		}
		
  		this.postRef = base.push('comments', {
		    data: input
		  }).then(newLocation => {
		    let generatedKey = newLocation.key;
		  }).catch(err => {
		    //handle error

		  });
		 
		this.setState({respond:''});
		this.respText.value = '';
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
											<label htmlFor=""><h2>Write a Comment:</h2></label>
											<textarea name="" id="" cols="30" rows="10" ref={ (input) => this.respText = input }></textarea>
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
		const comments = this.state.comments;
		const { isLoggedIn }= this.props;
		return (
			<div>
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
									<h2>{ Object.keys(comments).length || 0 } Responses </h2>
								</div>
								<div>
									{Object.keys(comments).map(comment => {
										let date = new Date(comments[comment].posted);
										let createdDate = date.getMonth()+1 + '/' + date.getDate() + ' ' + date.getFullYear();
										let createdTime = date.getHours() + ':' + date.getMinutes();	
										return <CommentRow 
													key={ comment } 
													comment={ comments[comment]} 
													createdTime={ createdTime }  
													createdDate={ createdDate } 
												/>;
									})}
								</div>
								<div>
									{ this.respondForm() }
								</div>
							</div>
							<div className="fl_c" />
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Post;
