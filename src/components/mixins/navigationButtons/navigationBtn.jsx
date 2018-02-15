import React, { Component } from 'react';
import './css/navigationBtn.css';
import arrow from './img/back-arrow.png';

const NavigationBnt = (props) => {
	let BackBtn;
	let actionBnt;
	let btnLink;
	if (props.hasOwnProperty('page') && props.isLoggedIn ) {
		switch(props.page) {
			case 'home' :
			actionBnt = (<a href="/new" className="new-topic-button btn">New Topic</a> );
			break;
			case 'post' :
			BackBtn = (<a href="/" className="back-button btn"><span><img src={arrow} alt=""/></span>Back</a> );
			actionBnt = (<a href="/" className="new-comment-button btn">Respond</a> );
			break;
			case 'new' :
			BackBtn = (<a href="/" className="back-button btn"><span><img src={arrow} alt=""/></span>Back</a> );
			actionBnt = (<a href="" className="new-comment-button btn">Reset</a> );
			default :
			break;
		}
	} 
	if (props.isLoggedIn) {
		return (
			<div className="navigation-buttons">
				{BackBtn} {actionBnt}
			</div>

		);
	} else if (!props.isLoggedIn && props.hasOwnProperty('page') && props.page === 'post' ) {
			BackBtn = (<a href="/" className="back-button btn"><span><img src={arrow} alt=""/></span>Back</a> );
			actionBnt = (<a href="/login" className="new-comment-button btn">Respond</a> );
			console.log(props.isLoggedIn);
			return (
				<div className="navigation-buttons">
					{BackBtn} {actionBnt}
				</div>

			);
	} else {
		return ( '' )
	}
};

export default NavigationBnt;