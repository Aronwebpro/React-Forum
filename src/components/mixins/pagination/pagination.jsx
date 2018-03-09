import React, {Component} from 'react';
import firebaseApp from '../../../firebase';


class Pagination extends Component {
	constructor() {
		super();
		this.state = {count: 1}
	}
	componentWillMount() {
		firebaseApp.database()
			.ref('config/topicsCount')
			.once('value')
			.then((snapshot) => {
				this.setState({topicsCount: snapshot.val()});
		});	
	}
	render() {
		let { count } = this.state;
		return (
			<div>
				<div>
					<span onClick={() => { this.props.updateTopics(this.props.last, 'prev') } } className="fl_l">Prev</span>
					<span onClick={() => { this.props.updateTopics(this.props.last, 'next') } } className="fl_r">Next</span>
				</div>
				<div className="fl_c" />
			</div>
		)
	}
}

export default Pagination;