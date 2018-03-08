import React, {Component} from 'react';


class CommentRow extends Component {
	constructor() {
		super();
	}
	render() {

		const { comment, createdDate, createdTime, quote, commentId, clickedId, user, respondText  } = this.props;
		let clickedStyle = {display: 'none' }
		if (commentId === clickedId) clickedStyle = this.props.replyStyleInit
		return (
			<div className="topic">
				<div className="full-post" onClick={ () => {  respondText({text: comment.text, user:comment.authorName, clickedId:commentId, commentId:commentId }) } }>
					<div className="reply-to-this" style={ clickedStyle } >
						<div className="reply-to-this_text">
							<div className="reply-to-this-text-inner" style={ this.props.replyStyle }>Qoute this Comment?</div>
						</div>
					</div>
					<div className="post">
						<div className="post-info"><p><span className="theme-color_txt">Replied:</span> {createdDate + ' ' + createdTime}</p></div>
						<div className="post-text">
							{	//Return comment text if quote
								comment.hasOwnProperty('quote') && 
								comment.quote.text && 
								( <div className="quote"><p className="theme-color_txt">{ comment.quote.user } said: </p><p>"{comment.quote.text}"</p></div>)
							}
							<p>{comment.text}</p>
							
						</div>
						<div className="quote-comment theme-color_txt">
							<p>Click to qoute</p>
						</div>
					</div>
					<div className="author-info">
						<img src={comment.authorAvatar} alt=""/>
						<p><span className="theme-color_txt">Author:</span> <span className="bold">{comment.authorName}</span></p>
						<p><span className="theme-color_txt">Member Since: </span><span className="bold">{comment.memberSince}</span></p>
					</div>
					<div className="fl_c" />
				</div>
				<div className="fl_c" />
			</div>
		)
		}
}

export default  CommentRow;