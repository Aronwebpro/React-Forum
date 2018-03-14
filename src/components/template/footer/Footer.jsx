import React, { Component } from 'react';
import './css/footer.css';
import firebaseLogo from './img/firebase.png';

class Footer extends Component {
  render() {
    return (
        <footer className="footer"> 
			<div>
				<h1>Game <span className="theme-color_txt">Forum</span> built on</h1>
				<span id="react-logo"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt=""/> </span>
				<span> &nbsp;&nbsp;and</span>
				<span id="firebase-logo"><img src={firebaseLogo} alt=""/></span>
			</div>
			<p>This web application has been built for learning purposes to learn React Js and Google Firebase database</p>
			<p>Feel free to try it out. You are welcome to create a new account and start your own discussion!</p>
			<h2>Developed by Aaron D</h2>
        </footer>
    );
  }
}

export default Footer;