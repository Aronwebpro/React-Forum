import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import TopicRow from '../../mixins/topicrow/TopicRow';
import { Redirect } from 'react-router';
import {FlashMessage } from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../api/FlashMessageHandler';
import PropTypes from 'prop-types';
import { getPosts, getPostByCategory } from '../../../api/lookups.js';

class Home extends Component {
	constructor() {
		super();
		this.state = {topics: {}, redirect:false, flashMessage:{}, displayFlashMessage: false, hideLoadBtn:true, amount: 10,};
		this.convertDate = this.convertDate.bind(this);
		this.updateTopics = this.updateTopics.bind(this);
		this.loadMoreTopics = this.loadMoreTopics.bind(this);
		this.displayFlashMessageIfItSet = this.displayFlashMessageIfItSet.bind(this);
	}
	componentDidMount() {
		//Retrieve Topics from DB
		this.updateTopics();
		const flashMessage = FlashMessageHandler.fetch();
		if (flashMessage.msg) this.setState({displayFlashMessage: true, flashMessage });
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
		this.setState({amount});
	}
	displayFlashMessageIfItSet() {
		if (this.state.displayFlashMessage) {
			setTimeout(() => {
				this.setState({displayFlashMessage:false});
				FlashMessageHandler.reset();
			}, 2500);
			return ( <FlashMessage {...this.state.flashMessage} /> )
		}
	}
	render() {
		const { topics } = this.state;
		const { isLoggedIn } = this.props;
		if (this.state.redirect ) return <Redirect to="/" />		
		return (
			<div className="container">
				{ this.displayFlashMessageIfItSet()  }
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