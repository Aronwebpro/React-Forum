import React from 'react';


const CommentRow = (props) => {
	const { comment, createdDate, createdTime, quote } = props;
	let reply;
	if (comment.hasOwnProperty('quote') && comment.quote.text) {
		reply = ( <div className="quote"><p>{ comment.quote.user } said: </p><p>"{comment.quote.text}"</p></div> );
	}
	return (
		<div className="topic">
			<div className="full-post" onClick={ () => props.respondText({text: comment.text, user:comment.authorName }) }>
				<div className="post">
					<div className="post-info"><p>Replied: {createdDate + ' ' + createdTime}</p></div>
					<div className="post-text">
						{ reply }
						<p>{comment.text}</p>
						
					</div>
				</div>
				<div className="author-info">
					<img src={comment.authorAvatar} alt=""/>
					<p>Author: {comment.authorName}</p>
					<p>Member Since: {comment.memberSince}</p>
				</div>
				<div className="fl_c" />
			</div>
			<div className="fl_c" />
		</div>
	)
}

export default  CommentRow;