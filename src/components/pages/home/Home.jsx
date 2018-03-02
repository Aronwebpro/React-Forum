import React, { Component } from 'react';
import SearchFilter from '../../mixins/searchFilter/SearchFilter';
import TopicRow from '../../mixins/topicrow/TopicRow';
import { Redirect } from 'react-router';
import Flash from '../../mixins/flash/Flash';
//Data
import data from '../../../topics.json';
import categories from '../../../categories.json';
//import firebaseApp from '../../../firebase';
import firebaseApp from '../../../firebase';

class Home extends Component {
	constructor() {
		super();
		this.state = {topics: {}, redirect:false, flash:false};
		this.flash = this.flash.bind(this);
	}
	componentWillMount() {
		if (this.props.params) {
				firebaseApp.database()
					.ref('topics')
					.orderByChild('categoryUrl')
					.equalTo(this.props.params.params.category)
					.once('value', (snapshot) => {
						if (snapshot.val()) {
							this.setState({topics: snapshot.val()});
						} else {
							this.setState({redirect: true});
						}
				});
		} else {
				firebaseApp.database()
					.ref('topics')
					.orderByChild('created')
					.once('value')
					.then((snapshot) => {
						this.setState({topics: snapshot.val()});
				});				
		}
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
			this.arrow.style.transform = 'rotateZ(-90deg) translate(10%, 40%)';
		} else {
			this.arrow.style.transform = 'rotateZ(0deg) translate(20%, 0%)';
		}
	}
	flash(status=true, msg, msgStatus, redirect=false, url='/', back='/') {
		firebaseApp.database().ref('flash').update({status:status, msg:msg, msgStatus:msgStatus, redirect: redirect, redirectUrl: url, back:back});
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
	          					<SearchFilter categories={categories} page="home" isLoggedIn={ isLoggedIn } flash={ this.flash } /> 
	          				</div>
	          				<div className="right">
								<div className="forum">
									<div className="forum-header">
										<div className="forum-title">
											<h2>Recent Posts</h2>
										</div>
										<div ref={input => (this.arrow = input)} className="arrors" onClick={() => this.expand(this)}>
											<div className="leftArrow" />
											<div className="rightArrow" />
										</div>
									</div>
									<div className="fl_c" />
									<div ref={input => (this.forumContent = input)} className="forum-content">
										<div ref={input => (this.forumContentInner = input)} className="forum-coontent-inner" >
											{Object.keys(topics).reverse().map(topic => {
												let date = new Date(topics[topic].created);
												let since = date.getMonth()+1 + '/' + date.getDate() + '  ' + date.getFullYear();
												let createdDate = date.getMonth()+1 + '/' + date.getDate() + ' ' + date.getFullYear();
												let createdTime = date.getHours() + ':' + date.getMinutes();	
												return <TopicRow key={topic} topicId={topic} topic={topics[topic]} since={ since } createdTime={ createdTime }  createdDate={ createdDate }/>;
											})}
										</div>
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