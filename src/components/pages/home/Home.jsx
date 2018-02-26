import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import TopicRow from '../../mixins/topicrow/TopicRow';
//Data
import data from '../../../topics.json';
import categories from '../../../categories.json';
//import firebaseApp from '../../../firebase';
import firebase from 'firebase';
class Home extends Component {
	constructor() {
		super();
		this.state = {topics: {}};
	}
	componentWillMount() {
		this.refTopics = firebase.database().ref('topics').once('value').then((snapshot) => {
			this.setState({topics: snapshot.val()});
		});	
	}
	componentDidUpdate() {
		window.addEventListener('load', () => { this.forumContent.style.height = this.forumContentInner.clientHeight+'px'; });
	}
	expand(component) {
		if (component.forumContent.clientHeight > 0) {
			component.forumContent.style.height = 0 + 'px';
			component.changeBtn('down');
		} else {
			component.forumContent.style.height = component.forumContentInner.clientHeight+'px';
			component.changeBtn();
		}
	}
	changeBtn(position) {
		if (position === 'down') {
			this.arrow.style.transform = 'rotateZ(-90deg) translate(10%, 40%)';
		} else {
			this.arrow.style.transform = 'rotateZ(0deg) translate(20%, 0%)';
		}
	}
	render() {
		const { topics } = this.state;
		const { isLoggedIn } = this.props;
		return (
			<div id="home">
	          		<div className="container">
	          				<div className="left">
	          					<SearchFilter categories={categories} page="home" isLoggedIn={ isLoggedIn } /> 
	          				</div>
	          				<div className="right">
								<div className="forum">
									<div className="forum-header">
										<div className="forum-title">
											<h2>Recent Posts</h2>
										</div>
										<div ref={input => (this.arrow = input)} className="arrors" onClick={() => this.expand(this)}>
											<div className="leftArrow" />
											<div className="rightArrow" />
										</div>
									</div>
									<div className="fl_c" />
									<div ref={input => (this.forumContent = input)} className="forum-content">
										<div ref={input => (this.forumContentInner = input)} className="forum-coontent-inner" >
											{Object.keys(topics).map(topic => {
												let date = new Date(topics[topic].created);
												let since = date.getMonth()+1 + '/' + date.getDate() + '  ' + date.getFullYear();
												let createdDate = date.getMonth()+1 + '/' + date.getDate() + ' ' + date.getFullYear();
												let createdTime = date.getHours() + ':' + date.getMinutes();	
												return <TopicRow key={topic} topicId={topic} topic={topics[topic]} since={ since } createdTime={ createdTime }  createdDate={ createdDate }/>;
											})}
										</div>
									</div>
								</div>
	          				</div>
	          		</div>
	         <div className="fl_c"></div> 
			</div>
		)
	}
}

export default Home;