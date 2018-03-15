import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import TopicRow from '../../mixins/topicrow/TopicRow';
import { Redirect } from 'react-router';
import Flash from '../../mixins/flash/Flash';
import firebaseApp from '../../../firebase';

class Home extends Component {
	constructor() {
		super();
		this.state = {topics: {}, redirect:false, flash:false, loadHide:true, amount:10};
		this.flash = this.flash.bind(this);
		this.convertDate = this.convertDate.bind(this);
		this.updateTopics = this.updateTopics.bind(this);
		this.loadMoreTopics = this.loadMoreTopics.bind(this);
	}
	componentWillMount() {
		this.updateTopics();
	}
	componentDidMount() {
		firebaseApp.database()
			.ref('flash')
			.once('value')
			.then((snapshot) => {
				let data = snapshot.val();
				if (data && data.status === true ) {	
					firebaseApp.database().ref('flash').update({status:false, msg:'', msgStatus:'', redirect:false, redirectUrl:''});
					this.setState({flash:data.status, flashMsg:data.msg, flashStatus:data.msgStatus});
				}							
			if (data && data.back) {
					firebaseApp.database().ref('flash').update({back:false});
			}
		});		
	}
	componentDidUpdate() {
		window.addEventListener('load', () => { this.forumContent.style.height = this.forumContentInner.clientHeight+'px'; });
	}
	updateTopics(amount) {
		let number = amount || this.state.amount;
		if (this.props.params) {
				firebaseApp.database()
					.ref('topics')
					.orderByChild('categoryUrl')
					.equalTo(this.props.params.params.category)
					.limitToLast(number)
					.once('value', (snapshot) => {
						if (snapshot.val()) {
							let loadHide = true;
							if (Object.keys(snapshot.val()).length == number ) loadHide = null;
							this.setState({topics: snapshot.val(), loadHide:loadHide});
						} else {
							this.setState({redirect: true});
						}
				});
		} else {
			firebaseApp.database()
				.ref('topics')
				.limitToLast(number)
				.orderByKey()
				.once('value')
				.then((snapshot) => {
					let loadHide = true;
					console.log();
					if (Object.keys(snapshot.val()).length == number) loadHide = null;
					this.setState({topics: snapshot.val(), loadHide: loadHide });
					
			});
		}	
	}
	expand(component) {
		if (component.forumContent.clientHeight > 0) {
			component.forumContent.style.height = 0 + 'px';
			component.changeBtn('down');
		} else {
			component.forumContent.style.height = component.forumContentInner.clientHeight+'px';
			component.changeBtn();
		}
	}
	changeBtn(position) {
		if (position === 'down') {
			this.arrow.style.transform = 'rotateZ(-90deg) translate(7%, 40%)';
		} else {
			this.arrow.style.transform = 'rotateZ(0deg) translate(20%, 0%)';
		}
	}
	flash(status=true, msg, msgStatus, redirect=false, url='/', back='/') {
		firebaseApp.database().ref('flash').update({status:status, msg:msg, msgStatus:msgStatus, redirect: redirect, redirectUrl: url, back:back});
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
	          					<SearchFilter page="home" isLoggedIn={ isLoggedIn } flash={ this.flash } /> 
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
										{!this.state.loadHide && (<button className="btn" onClick={ this.loadMoreTopics }>Load More</button>)}
									</div>
								</div>
	          				</div>
	          		</div>
	         <div className="fl_c"></div> 
			</div>
		)
	}
}

export default Home;