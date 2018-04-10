import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import TopicRow from '../../mixins/topicrow/TopicRow';
import { Redirect } from 'react-router';
import Flash from '../../mixins/flash/Flash';
import PropTypes from 'prop-types';
import { getPosts, getPostByCategory, flash } from '../../../Model/queries.js';

class Home extends Component {
	constructor() {
		super();
		this.state = {topics: {}, redirect:false, flash:false, hideLoadBtn:true};
		this.convertDate = this.convertDate.bind(this);
		this.updateTopics = this.updateTopics.bind(this);
		this.loadMoreTopics = this.loadMoreTopics.bind(this);
	}
	async componentDidMount() {
		//Retrieve Topics from DB
		this.updateTopics();

		//Show Flash Message If it was set in DB
		const snapshot =  await flash.getFlashMessage();
		const {status, msg, msgStatus, back}  = snapshot.val();
		if (msg) {
			if (status === true ) {	
				flash.resetFlashMessage();
				this.setState({flash: status, flashMsg: msg, flashStatus: msgStatus});
			}							
			if (back) {
				flash.updateFlashMessage({back:false})
			}
		}
	
	}
	componentDidUpdate() {
		window.addEventListener('load', () => { this.forumContent.style.height = this.forumContentInner.clientHeight+'px'; });
	}
	//Retrieve Topics from DB
	async updateTopics(limit=10) {
		if (this.props.params) {
			const snapshot = await getPostByCategory(this.props.params.params.category, limit);
			//Handle load more button		
			let hideLoadBtn = true;
			if (Object.keys(snapshot.val()).length === limit ) hideLoadBtn = null;
			this.setState({topics: snapshot.val(), hideLoadBtn:hideLoadBtn});
		} else {
			const snapshot = await getPosts(limit);
			//Handle load more button
			let hideLoadBtn = true;
			if (Object.keys(snapshot.val()).length === limit) hideLoadBtn = null;
			this.setState({topics: snapshot.val(), hideLoadBtn: hideLoadBtn });
		}	
	}
	//Expand Widget Header on Click
	expand(component) {
		if (component.forumContent.clientHeight > 0) {
			component.forumContent.style.height = 0 + 'px';
			component.changeBtn('down');
		} else {
			component.forumContent.style.height = component.forumContentInner.clientHeight+'px';
			component.changeBtn();
		}
	}
	//Change header arrow position up or down
	changeBtn(position) {
		if (position === 'down') {
			this.arrow.style.transform = 'rotateZ(-90deg) translate(7%, 40%)';
		} else {
			this.arrow.style.transform = 'rotateZ(0deg) translate(20%, 0%)';
		}
	}
	convertDate(unixTime, type) {
		var date = new Date(unixTime);
		var returnString;
		if (type === 'date') {
			returnString = date.getMonth()+1 + '/' + date.getDate() + ' ' + date.getFullYear();
		} else if (type === 'time') {
			returnString = date.getHours() + ':' + date.getMinutes();
			
		}
		return returnString;																				
	}
	loadMoreTopics() {
		const amount = this.state.amount + 10;
		this.updateTopics(amount);
		this.setState({amount: amount});
	}
	render() {
		const { topics } = this.state;
		const { isLoggedIn } = this.props;
		if (this.state.redirect ) { return <Redirect to="/" /> }
		if(this.state.flash) {
			setTimeout(() => {
				this.setState({flash:false});
			}, 2500);
		}			
		return (
			<div className="container">
					{ this.state.flash && <Flash status={this.state.flashStatus} text={this.state.flashMsg}/> }
	          		<div id="home">
	          				<div className="left">
	          					<SearchFilter page="home" isLoggedIn={ isLoggedIn } /> 
	          				</div>
	          				<div className="right">
								<div className="forum">
									<div className="forum-header">
										<div className="forum-title">
											<h2>Recent Discussions</h2>
										</div>
										<div ref={input => (this.arrow = input)} className="arrors" onClick={() => this.expand(this)}>
											<div className="leftArrow" />
											<div className="rightArrow" />
										</div>
									</div>
									<div className="fl_c" />
									<div ref={input => (this.forumContent = input)} className="forum-content">
										<div ref={input => (this.forumContentInner = input)} className="forum-coontent-inner" >
											{topics && Object.keys(topics).reverse().map(topic => {
												return <TopicRow key={topic} topicId={topic} convertDate={this.convertDate} topic={topics[topic]} />;
											})}
										</div>
									</div>
									<div className="load-more-wrapper">
										{!this.state.hideLoadBtn && (<button className="btn" onClick={ this.loadMoreTopics }>Load More</button>)}
									</div>
								</div>
	          				</div>
	          		</div>
	         <div className="fl_c"></div> 
			</div>
		)
	}
}

Home.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	params:PropTypes.object
}

export default Home;