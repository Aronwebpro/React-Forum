import React, { Component } from 'react';
import { Redirect } from 'react-router';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import firebaseApp from  '../../../firebase';

class Home extends Component {
	constructor() {
		super();
		this.post = this.post.bind(this);
		this.state = { topics: [], redirect: false};
	}
	post() {
		const created = Date.now();
		const categoryUrl = this.category.value.replace(/\s/g, '').toLowerCase();
		const input = {
			title: this.title.value,
			text: this.text.value,
			category: this.category.value,
			categoryUrl: categoryUrl,
			authorAvatar: this.props.user.authorAvatar,
			authorName: this.props.user.authorName,
			memberSince: this.props.user.memberSince,
			type: this.type.value,
			created: created,
			last: this.props.user.authorName,
			lastAvatar: this.props.user.authorAvatar,
			repliesCount: 0,
			lastDate: created

		}
		const key = firebaseApp.database().ref().child('topics').push().key;
		let updates = {};
		updates[key] = input;
		const db = firebaseApp.database();
			db.ref('topics').update(updates)
			.then(() => {
				let category = this.category.value;
				db.ref('categories/'+categoryUrl+'/count').once('value', (snapshot) => {
					let count = snapshot.val() + 1;
					db.ref('/categories/'+ categoryUrl).update({count:count});
				});
			})
			.then(() => {
				db.ref('config/topicsCount').once('value', (snapshot) => {
					let postCount = snapshot.val() + 1;
					db.ref('config').update({topicsCount:postCount});
				});
			})
			.then(() => {
				db.ref('flash').update({status:true, msg:'Congrats! Your Post Created!', msgStatus:'success', redirect:false, redirectUrl:''});
				this.setState({url:'/post/'+key, redirect:true});
			})
			.catch( err => {
				console.log('Error!');
				console.log(err);
			});
	}
	render() {
		const { isLoggedIn } = this.props;
		if (this.state.redirect === true ) { return <Redirect to={this.state.url} /> }
		if(isLoggedIn) {
			return (
				<div id="home">
		          		<div className="container">
		          				<div className="left">
		          					<SearchFilter page="new" isLoggedIn={ isLoggedIn } /> 
		          				</div>
		          				<div className="right post-container">
		          					<div className="post-title forum-header">
										<h2>New Discussion</h2>
									</div>
									<div className="full-post new-post-body">
										<form>
											<label htmlFor=""><h3>Title:</h3></label>
											<input type="text" name="title" ref={ (input => this.title = input) } />
											<div className="category-select">
												<label htmlFor=""><h3>Category</h3></label>
												<select name="category" id="" ref={ (input => this.category = input) }>
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
												<select name="category" id="" ref={ (input => this.type = input) }>
													<option value="">Select Type</option>
													<option value="announcement">Announcement</option>
													<option value="question">Question</option>
													<option value="general">General</option>
												</select>
											</div>
											<label htmlFor=""><h3>Text:</h3></label>
											<textarea name="" id="" cols="30" rows="10" ref={ (input => this.text = input) }></textarea>
										</form>
										<button className="btn" onClick={ this.post } style={ {marginTop:'20px'} } >Post</button>
									</div>
		          				</div>
		          		
		          </div>
		         <div className="fl_c"></div> 

				</div>
			)
		} else {
			return <Redirect to="/" />
		}
	}
}

export default Home;