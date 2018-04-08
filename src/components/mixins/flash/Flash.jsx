import React from 'react';
import PropTypes from 'prop-types';
import './css/flash.css';

//Flash component shows Flash messages to user
const Flash = (props) => {
    if (!props.text)  return '';
    let flash;
    let color;
    setTimeout(() => { 
        if (!flash) return
        flash.style.animation = 'none';
        flash.style.animation = null;
    },100);
    switch(props.status) {
        case 'error' :
            color = '#c74141';
            break;
        case 'success' :
            color = 'rgb(97,218,251)';
            break;
        default:
            color = '#cecece';
    }
    return (
        <div className="flash-wrapper shake" style={ {textAlign: 'center', padding:' 2px', border:'1px solid', borderColor:color } }  ref={ (input => flash = input )} >
            <div className="flash"  style={ { fontWeight: 'bold', border:'3px solid', borderColor:color } } >
                <p>
                    {props.text}
                </p>
            </div>
        </div>    
    )
}
PropTypes.Flash = {
    status: PropTypes.string,
    text: PropTypes.string
}
export default Flash;