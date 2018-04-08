import React from 'react';
import PropTypes from 'prop-types';

//Comment Layout Component
const CommentRow = (props) => {
	const {
		commentId,
		comment,
		postedDate,
		clickedId,
		respondText,
		replyStyle,
		replyStyleInit
	} = props;

	//Show comment overlay style if somebody clicked to quote
	let clickedStyle = {display: 'none'};
	if (commentId === clickedId) clickedStyle = replyStyleInit;
	
	//Date and time comments was created
	const date = new Date(postedDate);
	const createdDate = date.getMonth()+1 + '/' + date.getDate() + ' ' + date.getFullYear();
	const createdTime = date.getHours() + ':' + date.getMinutes();

	return (
		<div className="topic">
			<div className="full-post">
				<div className="reply-to-this" style={ clickedStyle } >
					<div className="reply-to-this_text">
						<div className="reply-to-this-text-inner" style={ replyStyle } onClick={ () => {  respondText({text: comment.text, user:comment.authorName, clickedId:commentId, commentId:commentId }) } }>Qoute this Comment?</div>
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
						<p onClick={ () => {  respondText({text: comment.text, user:comment.authorName, clickedId:commentId, commentId:commentId }) } }>Click to qoute</p>
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
};
PropTypes.CommentRow = {
		commentId: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired,
		postedDate: PropTypes.number.isRequired,
		clickedId: PropTypes.string,
		respondText: PropTypes.string,
		replyStyleInit: PropTypes.object,
		replyStyle: PropTypes.object
};

export default  CommentRow;