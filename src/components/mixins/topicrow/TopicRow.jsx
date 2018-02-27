import React, { Component } from 'react';
import './css/topicrow.css';

//images
import defGm from './img/forum_img.png';
import brdGm from './img/board-games.png';
import CardGm from './img/card-games.jpg';
import PcGm from './img/pc-games.png';
import ConsGm from './img/console-games.png';
import HandGm from './img/handheld-games.png';


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
				<a href={`/post/${topicId}`}>
					<div className="row-left">
						<div className="topic-category">
							<div className="category-img">
								<img src={this.categoryImg(topic.category)} alt="" />
							</div>
							<p>{ topic.category }</p>
						</div>
					</div>
					<div className="row-middle">
						<div className="topic-title">
							<h3>{topic.title}</h3>
							<p>Created: { createdDate+' '+createdTime }</p>
						</div>
						<div className="topic-description">
							<p>{topic.text}</p>
						</div>
						<div className="topic-readmore">
							<p>Click to Read More</p>
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
