import React from 'react';


const CommentRow = (props) => {
	const { comment, createdDate, createdTime } = props;
	return (
		<div className="topic">
			<div className="full-post">
				<div className="post">
					<div className="post-info"><p>Created: {createdDate}</p></div>
					<p>{comment.text}</p>
				</div>
				<div className="author-info">
					<img src={comment.authorAvatar} alt=""/>
					<p>Author: {comment.authorName}</p>
				</div>
				<div className="fl_c" />
			</div>
			<div className="fl_c" />
		</div>
	)
}

export default  CommentRow;