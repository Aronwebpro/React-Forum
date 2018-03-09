import React, { Component } from 'react';
import { Redirect } from 'react-router';

//Components
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import CommentRow from '../../mixins/commentrow/CommentRow';
import Flash from '../../mixins/flash/Flash';

//Database
import firebaseApp from '../../../firebase';

class Post extends Component {
	constructor(props) {
		super(props);
		this.respond = this.respond.bind(this);
		this.respondForm = this.respondForm.bind(this);
		this.postComment = this.postComment.bind(this);
		this.respondText = this.respondText.bind(this);
		this.getPost = this.getPost.bind(this);
		this.getComments = this.getComments.bind(this);
		this.comClick = this.comClick.bind(this);
		this.escClick = this.escClick.bind(this);
		this.clearReply = this.clearReply.bind(this);
		this.flash = this.flash.bind(this);

		this.Id = this.props.params.params.postId;
		const defaultState = { 
					post: {},
					user: props.user,
					comments: {},
					replyText: '',
					replyStyle: { width: '0', height: '0'},
					replyStyleInit: {display: 'none' },
					clickedId:'',
					redirect:false,
					isReply:false
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
		this.getPost();
		this.getComments();
	}
	componentDidMount() {
		document.addEventListener('click', this.comClick);
		document.addEventListener('keydown', this.escClick);
		firebaseApp.database()
			.ref('flash')
			.once('value')
			.then((snapshot) => {
				let data = snapshot.val();
				if (data && data.status === true ) {	
					firebaseApp.database().ref('flash').update({status:false, msg:'', msgStatus:'', redirect:false, redirectUrl:''});
					this.setState({flash:data.status, flashMsg:data.msg, flashStatus:data.msgStatus});
				}							
		});

	}
	componentWillUnmount() {
		document.removeEventListener('click', this.comClick);
		document.removeEventListener('keydown', this.escClick);
	}
	comClick(e) {
		if (e.target.classList.value === 'container' || e.target.classList.value === 'content') {
				this.setState({reply: false, replyStyleInit: {display: 'none'}});
		}
	}
	escClick(e, obj) {
		if (e.keyCode === 27) {
			this.setState({reply: false, replyStyleInit: {display: 'none'}});
		}
	}
	getPost() {
		this.topicRef = firebaseApp.database()
							.ref('/topics/'+this.Id)
							.once('value', (snapshot) => {
								if (snapshot.val()) {
									let post = {};
									post[this.Id] = snapshot.val();
									this.setState({post});
								}
							});		
	}
	getComments() {
		this.commentRef = firebaseApp.database()
							.ref('/comments/')
							.orderByChild('topicId')
							.equalTo(this.Id)
							.once('value', (snapshot) => {
								if (snapshot.val()) {
									this.setState({comments:snapshot.val()});
								}
							});		
	}
	postComment() {
		const time = Date.now();
		const input = {
			text: this.respText.value,
			authorAvatar: this.props.user.authorAvatar,
			authorName: this.props.user.authorName,
			memberSince:this.props.user.memberSince,
			topicId:this.Id,
			posted: time,
			quote: this.state.replyText
		}
		const key = firebaseApp.database().ref().child('comments').push().key;
		let updates = {};
		updates[key] = input;
		this.postRef = firebaseApp.database()
						.ref('comments')
						.update(updates)
						.then(() => {
							this.getComments();
							let date = Date.now();
							this.updatePost(this.Id, {
								last: this.props.user.authorName,
								lastAvatar: this.props.user.authorAvatar,
								lastDate: date,
								repliesCount: ''
							});
						})
						.catch( err => {
							console.log('Error!');
							console.log(err);
						});
		this.setState({respond:'', reply:false, replyStyleInit: {display: 'none' }});
		this.respText.value = '';
	}
	updatePost(id, input) {
		const db = firebaseApp.database().ref('topics/'+id);		
			db.once('value', (snapshot) => {
				input['repliesCount'] = snapshot.val().repliesCount + 1;
				db.update(input)
				.then(() => {
				})
				.catch( err => {
					console.log('Error!');
					console.log(err);
				});	
			});				
	}
	respond(user) {
		this.setState({
			respond: true,
			user: user
		});
		setTimeout(() => this.respondDiv.scrollIntoView({ behavior:'smooth'}), 200 );
	}
	clearReply() {
		this.setState({replyText:''});
	}
	respondForm() {
		if (this.state.respond === true ) {
			return ( 
				<div className="full-post" style={ {marginTop:'20px'} } >
					<div className="post">
						<div className="full-post new-post-body">
							{	//Return comment text if quote
								this.state.replyText != '' &&  
								( <div><span className="theme-color_txt">Replying to...</span><br /><div className="quote"><p>{ this.state.replyText.user } said: </p><p>"{this.state.replyText.text}"</p></div></div>)
							}
							<form>
								<label htmlFor=""><h2>Write a Comment:</h2></label>
								<textarea name="" id="" cols="30" rows="10" ref={ (input) => this.respText = input }></textarea>
							</form>
							<button onClick={ this.postComment } className="btn" style={ {marginTop: '20px'} } >Post</button>
						</div>
					</div>
					<div className="author-info">
						<img src={this.props.user.authorAvatar} alt=""/>
						<p>Author: {this.props.user.authorName}</p>
						<p>Member Since: {this.props.user.memberSince}</p>
					</div>
					<div className="fl_c" />
				</div> 
				);
		}
	}
	respondText(data) {
		console.log(this.state.reply);
		this.setState({replyStyle: { width: '100%', height: '100%'}, replyStyleInit: {display: 'block' }, reply: true, clickedId:data.clickedId });
		if( this.state.reply === true) {

			if (this.state.clickedId != data.commentId) { console.log('shit happen'); return }
			if (!this.props.user) { this.setState({redirect:true}); this.flash(true, 'Sorry! You have to login to Reply!', 'error', false, '', window.location.href ); window.scrollTo(0, 0); return; }
			this.setState({replyText: {text:data.text, user:data.user}, reply: false, replyStyleInit: {display: 'none'} });
			this.respond();
		}
	}
	flash(status=true, msg, msgStatus, redirect=false, url='/', back='/') {
		firebaseApp.database().ref('flash').update({status:status, msg:msg, msgStatus:msgStatus, redirect: redirect, redirectUrl: url, back:back });
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
		const { comments } = this.state;
		const { isLoggedIn }= this.props;
		if (this.state.redirect ) { return <Redirect to="/login" /> }
		if(this.state.flash) {
			setTimeout(() => {
				this.setState({flash:false});
			}, 2500);
		}				
		return (
			<div>
				<div className="post-page">
					<div className="content">
						<div className="container">
							{ this.state.flash && <Flash status={this.state.flashStatus} text={this.state.flashMsg}/> }
							<div className="left">
								<SearchFilter page="post" isLoggedIn={ isLoggedIn } respond={ this.respond } clearReply={ this.clearReply } flash={this.flash}/>
							</div>
							<div className="right post-container">
								<div className="post-title forum-header">
									<h2>{post.title}</h2>
								</div>
								<div className="full-post">
									<div className="post">
										<div className="post-info"><span className="theme-color_txt">Category:</span> {post.category}, <span className="theme-color_txt">Posted:</span> { createdDate + ' ' + createdTime } <span className="topic-type"> {post.type && (<span>#{ post.type }</span>) }</span></div>
										<div className="post-text">
											<p>{post.text}</p>
										</div>
									</div>
									<div className="author-info">
										<img src={post.authorAvatar} alt=""/>
										<p><span className="theme-color_txt">Author:</span> <span className="bold">{post.authorName}</span></p>
										<p><span className="theme-color_txt">Member Since:</span> <span className="bold">{createdDate}</span></p>
									</div>
									<div className="fl_c" />
								</div>
								<div className="post-title forum-header" style={ {marginTop:'20px'} }>
									<h2>{ Object.keys(comments).length || 0 } Responses </h2>
								</div>
								<div className="comments-wrapper">
									{Object.keys(comments).map(comment => {
										let date = new Date(comments[comment].posted);
										let createdDate = date.getMonth()+1 + '/' + date.getDate() + ' ' + date.getFullYear();
										let createdTime = date.getHours() + ':' + date.getMinutes();	
										return <CommentRow 
													key={ comment } 
													comment={comments[comment]} 
													createdTime={createdTime}  
													createdDate={createdDate}
													respondText={this.respondText}
													replyStyle={this.state.replyStyle}
													replyStyleInit={this.state.replyStyleInit}
													commentId={comment}
													clickedId={this.state.clickedId}
													user={this.props.user}
												/>;
									}) }
								</div>
								<div>
									{ this.respondForm() }
								</div>
							</div>
							<div className="fl_c" />
						</div>
					</div>
				</div>
				<div style={ { height: '20px' } } ref={input => this.respondDiv = input}></div>
			</div>

		);
	}
}

export default Post;
