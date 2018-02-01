import React, { Component } from 'react';
import Navigation from '../navigation/Navigation'
import './css/header.css';

class Header extends Component {
  constructor() {
    super();

    this.shrinkHeader = this.shrinkHeader.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.shrinkHeader);
  }

  //shrink the header when scroll down
  shrinkHeader() {
    const header = document.getElementById('header');
    const distanceY = window.pageYOffset;
      if(distanceY > 101) {
        header.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
      }
  }

  render() {
    return (
      <header id="header">
        <div className='app-header'>
          <a href="/"><h1 className='app-title'>Forum<span>Header</span></h1></a>
        </div>
        <Navigation />
      </header>
    );
  }
}

export default Header;