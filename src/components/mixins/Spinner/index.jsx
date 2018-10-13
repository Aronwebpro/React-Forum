import React from 'react';
//Styles
import './spinner.css';
//Img
import img from './img/spinner.gif';

export default class Spinner extends React.PureComponent {
    render() {
        return (
            <div className="page-spinner">
               <div  className="page-spinner-wrapper">
                   <img src={img} alt="Spinner" className="page-spinner-img"/>
               </div>
            </div>
        )
    }
}