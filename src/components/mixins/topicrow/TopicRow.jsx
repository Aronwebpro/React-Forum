import React, { Component } from 'react';
import './css/topicrow.css';

//images
import defGm from './img/forum_img.png';
import brdGm from './img/coolcat.png';
import CardGm from './img/freepik.jpg';
import PcGm from './img/freepik.jpg';
import ConsGm from './img/freepik.jpg';
import HandGm from './img/freepik.jpg';


class TopicRow extends Component {
	constructor() {
		super();
		this.categoryImg = this.categoryImg.bind();
		this.state = { users: [ {post: 0 } ] }
	}
	categoryImg(category) {
		switch (category) {
			case 'Board Games':
				return brdGm;
			case 'Card Games':
				return CardGm;
			case 'PC Games':
				return PcGm;
			case 'Console Games':
				return ConsGm;
			case 'Handheld Games':
				return HandGm;
			default:
				return defGm;
		}
	}
	render() {
		const { topic, since, createdDate, createdTime, topicId } = this.props;
		return (
			<div className="topic">
				<a href={`post/${topicId}`}>
					<div className="row-left">
						<div className="category-img">
							<img src={this.categoryImg(topic.category)} alt="" />
						</div>
						<div className="topic-date">
							<div className="left-topic-date">
								<p>Created: </p>
							</div>
							<div className="rigth-topic-date">
								<p>{ createdDate }</p>
								<p>{ createdTime }</p>
							</div>
							<div className="fl_c"></div>
						</div>
					</div>
					<div className="row-middle">
						<div className="topic-title">
							<h3>{topic.title}</h3>
						</div>
						<div className="topic-description">
							<p>{topic.text}</p>
						</div>
					</div>
					<div className="row-right">
						<div className="author-avatar">
							<img src={topic.authorAvatar} alt="" />
						</div>
						<div className="topic-meta">
							<p>
								By: <span className="author">{topic.authorName} </span>
							</p>
							<p>
								Status: <span className="author">Veteran</span>
							</p>
							<p>
								Posts: <span className="author">{ 'postNr'} </span>
							</p>
							<p>
								Member Since: <span className="date">{ since }</span>
							</p>
						</div>
					</div>
				</a>
				<div className="fl_c" />
			</div>
		);
	}
}

export default TopicRow;
