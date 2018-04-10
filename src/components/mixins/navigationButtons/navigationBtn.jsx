import React from 'react';
import './css/navigationBtn.css';
import PropTypes from 'prop-types';
import {flash} from '../../../Model/queries';

const NavigationBnt = (props) => {
	const {
		respond,
		clearReply,
		reset,
		isLoggedIn
	} = props;
	let BackBtn;
	let actionBnt;	
	if (props.hasOwnProperty('page')) {
		switch(props.page) {
			case 'home' :
			if (props.isLoggedIn) {
				actionBnt = (<a href="/new" className="new-topic-button btn">New Discussion</a> );
			} else {
				   actionBnt = (<a href="/login" 
									onClick={() => flash.createFlashMessage(true, 'Sorry! You have to login to start new Discussion!', 'error', false, '', window.location.href) } 
									className="new-topic-button btn"
								>
									New Discussion
								</a>);
			}
			break;
			case 'post' :
			if (isLoggedIn) {
				BackBtn = (<a href="/" className="back-button btn">Back</a> );
				actionBnt = (<a onClick={ () => {respond(); clearReply();} } className="new-comment-button btn">Reply</a> );
			} else {
				BackBtn = (<a href="/" className="back-button btn">Back</a> );
				actionBnt = (<a href="/login" 
								onClick={() => flash.createFlashMessage(true, 'Sorry! You have to login to Reply!', 'error', false, '', window.location.href) } 
								className="new-comment-button btn"
							>
								Reply
							</a> );
			}
			break;
			case 'new' :
				BackBtn = (<a href="/" className="back-button btn">Back</a> );
				actionBnt = (<a onClick={reset} className="new-comment-button btn">Reset</a> );
			break;
			default :
			break;
		}
	} 

	return (
		<div className="navigation-buttons">
			{BackBtn} {actionBnt}
		</div>
	)
};

PropTypes.NavigationBnt = {
	page: PropTypes.string,
	respond: PropTypes.func,
	clearReply: PropTypes.func,
	reset: PropTypes.func,
	isLoggedIn: PropTypes.bool
}
export default NavigationBnt;