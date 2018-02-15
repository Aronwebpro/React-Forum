import React, { Component } from 'react';
import { Redirect } from 'react-router';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';

//Template parts
import Header from '../../template/header/Header';
import Footer from '../../template/footer/Footer';

//import TopicRow from '../../__mixins/topicrow/TopicRow';
import Forum from '../../mixins/forum/Forum';

//Data
import categories from '../../../categories.json';

class Home extends Component {
	constructor() {
		super();
		this.state = { topics: []};
	}

	render() {
		const { isLoggedIn } = this.props;
		if(isLoggedIn) {
			return (
				<div id="home">
				<Header />	
		          <div className="content" >
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
											<button className="btn">Post</button>
										</form>
									</div>
		          				</div>

		          		</div>
		          </div>
		         <div className="fl_c"></div> 
				<Footer />
				</div>
			)
		} else {
			return <Redirect to="/" />
		}
	}
}

export default Home;