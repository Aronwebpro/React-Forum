import React, { Component } from 'react';
import './css/navigationBtn.css';
import arrow from './img/back-arrow.png';

const NavigationBnt = (props) => {
	let BackBtn;
	let actionBnt;
	if (props.hasOwnProperty('page')) {
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


	
	return (
		<div className="navigation-buttons">
			{BackBtn} {actionBnt}
		</div>

	);
};

export default NavigationBnt;