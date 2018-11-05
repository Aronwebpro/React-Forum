import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
//User Messages
import {FlashMessage} from '../../mixins/FlashMessage/FlashMessage';
import {FlashMessageHandler} from '../../../utils/FlashMessageHandler';


export default class Profile extends React.Component {
    state = {
        redirect: false
    };

    render() {
        if (this.state.redirect) return <Redirect to="/"/>
        return (
            <div className="container">
                {this.displayFlashMessageIfItSet()}
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Friends List</h2>
                    </div>
                    <div ref={input => (this.forumContent = input)} className="forum-content">
                        <div ref={input => (this.forumContentInner = input)} className="forum-content-inner">
                            You don't have any friends :/
                        </div>
                    </div>
                    <div className="fl_c"/>
                </div>
            </div>
        )
    }

    componentDidMount() {
                if (window) {
                    window.scrollTo(0, 0);
                }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }



    displayFlashMessageIfItSet = () => {
        if (this.state.displayFlashMessage) {
            setTimeout(() => {
                if(!this.isUnmount) {
                    this.setState({displayFlashMessage: false});
                }
                FlashMessageHandler.reset();
            }, 2500);
            return <FlashMessage {...this.state.flashMessage} />
        }
    };
}

Profile.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
