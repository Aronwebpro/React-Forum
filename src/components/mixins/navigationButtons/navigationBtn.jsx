import React, { Component } from 'react';
import './css/navigationBtn.css';
import arrow from './img/back-arrow.png';

const NavigationBnt = (props) => {
	let BackBtn;
	let actionBnt;
	let btnLink;	
	if (props.hasOwnProperty('page')) {
		switch(props.page) {
			case 'home' :
			if(props.isLoggedIn) {
				actionBnt = (<a href="/new" className="new-topic-button btn">New Discussion</a> );
			} else {
		   		actionBnt = (<a href="/login" onClick={() => props.flash(true, 'Sorry! You have to login to start new Discussion!', 'error', false, '', window.location.href) } className="new-topic-button btn">New Discussion</a> );
			}
			break;
			case 'post' :
			if(props.isLoggedIn) {
				BackBtn = (<a href="/" className="back-button btn">Back</a> );
				actionBnt = (<a onClick={ () => {props.respond(); props.clearReply();} } className="new-comment-button btn">Reply</a> );
			} else {
				BackBtn = (<a href="/" className="back-button btn">Back</a> );
				actionBnt = (<a href="/login" onClick={() => props.flash(true, 'Sorry! You have to login to Reply!', 'error', false, '', window.location.href) } className="new-comment-button btn">Reply</a> );
			}
			break;
			case 'new' :
				BackBtn = (<a href="/" className="back-button btn">Back</a> );
				actionBnt = (<a onClick={props.reset} className="new-comment-button btn">Reset</a> );
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

export default NavigationBnt;