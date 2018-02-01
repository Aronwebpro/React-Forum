import React, { Component } from 'react';
import TopicRow from '../topicrow/TopicRow';

//Styles import
import './css/forum-styles.css';

class Forum extends Component {
	constructor(props) {
		super(props);
		this.expand = this.expand.bind();
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
	componentDidUpdate() {
		window.addEventListener('load', () => { this.forumContent.style.height = this.forumContentInner.clientHeight+'px'; });

	}
	render() {
		const { topics } = this.props.topics;
		return (
			<div className="forum">
				<div className="forum-header">
					<div className="forum-title">
						<h2>Forum Component</h2>
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
		);
	}
}

export default Forum;
