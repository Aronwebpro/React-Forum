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
		const repliesCount = '7';
		const diType = 'Announcment';
		const repBy = 'Chipsy';
		const repAvatar = 'http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-A2-icon.png';
		const repTime = '3/07 2018';
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
						<div className="topic-title-wrapper topic-title">
							<div className="fl_l title-left">
								<h3>{topic.title}</h3>
							<p><span className="theme-color_txt">Created:</span> { createdDate+' '+createdTime }</p>
							<p className="topic-type">{ diType && (<span>#{ diType }</span>) }</p>
							</div>
							<div className="fl_l title-right">
								<table style={{borderLeft: '1px solid #ededde'}}>
									<tr>
										<th width="20%">Replies:</th>
										<th style={{fontWeight: '600', fontSize: '1.1em'}}>{ repliesCount }</th>
										<th rowspan="2" style={{borderLeft: '1px solid #ededde'}}>
											<table>
												<tr>
													<th style={{textAlign: 'right', fontWeight: '600', fontSize: '1.1em'}}>Most Recent</th>
													<th rowspan="3" width="50px">
														<img src={repAvatar} alt=""/>
													</th>
												</tr>
												<tr>
													<td style={ {textAlign:'right'}}> <span className="theme-color_txt">By:</span> <span style={{textAlign: 'right', fontWeight: '600'}} >{ repBy }</span></td>
												</tr>
												<tr>
													<td style={ {textAlign:'right'}}>{ repTime }</td>
												</tr>
											</table> 
										</th>
									</tr>
								</table>
								
							</div>
							<div className="fl_c"></div>
						</div>
						<div className="topic-description">
							<p>{topic.text}</p>
						</div>
						<div className="topic-readmore theme-color_txt">
							<p>Click to Discuss</p>
						</div>
					</div>
					<div className="row-right">
						<div className="author-avatar">
							<img src={topic.authorAvatar} alt="" />
						</div>
						<div className="topic-meta theme-color_txt">
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
