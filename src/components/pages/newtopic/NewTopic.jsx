import React, { Component } from 'react';
import { Redirect } from 'react-router';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';

//import TopicRow from '../../__mixins/topicrow/TopicRow';
import Forum from '../../mixins/forum/Forum';

//Data
import categories from '../../../categories.json';

//Database
import base from '../../../base';

class Home extends Component {
	constructor() {
		super();
		this.post = this.post.bind(this);
		this.state = { topics: [], redirect: false};
	}
	post() {
		const time = Date.now();
		const input = {
			title: this.title.value,
			text: this.text.value,
			category: this.category.value,
			authorAvatar: this.props.user.authorAvatar,
			authorName: this.props.user.authorName,
			created: time
		}
		
  		this.postRef = base.push('topics', {
		    data: input
		  }).then(newLocation => {
		  	this.setState({redirect: true});
		    let generatedKey = newLocation.key;
		  }).catch(err => {
		    //handle error
		  });
	}
	render() {
		const { isLoggedIn } = this.props;
		if (this.state.redirect === true ) { return <Redirect to="/" /> }
		if(isLoggedIn) {
			return (
				<div id="home">
		          		<div className="container">
		          				<div className="left">
		          					<SearchFilter categories={categories} page="new" isLoggedIn={ isLoggedIn } /> 
		          				</div>
		          				<div className="right post-container">
		          					<div className="post-title forum-header">
										<h2>New Post</h2>
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
													<option value="Handheld Games">Handheld Gamess</option>
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