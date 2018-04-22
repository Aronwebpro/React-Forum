import React from 'react';
import './css/flash.css';

//Flash component shows Flash messages to user
const FlashMessage = (props) => {
        const {
            msg,
            status
        } = props;
    
        //Reset Flash Animation
        let flash;
        setTimeout(() => { 
            if (!flash) return
            //flash.style.animation = 'none';
            flash.style.animation = null;
            FlashMessageHandler.reset();
        }, 50);

        //Flash boarder color by status
        let color;
        switch(status) {
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
            <div className="flash-wrapper shake" style={ {textAlign: 'center', padding:' 2px', border:'1px solid', borderColor:color } }  ref={ (input => flash = input ) } >
                <div className="flash"  style={ { fontWeight: 'bold', border:'3px solid', borderColor:color } } >
                    <p>
                        {msg}
                    </p>
                </div>
            </div> 
        )
};

export default FlashMessage;

//Manage Flash Message in Local Storage
export const FlashMessageHandler = {
    create: (msg, status, redirect=false, redirectUrl='/', back='/') => {
        const data = {msg, status, redirect, redirectUrl, back}
        localStorage.setItem('flashMessage', JSON.stringify(data));
    },
    fetch: () => {
        return JSON.parse(localStorage.getItem('flashMessage')) || {};
    },
    update: (update={}) => {
        const data = {msg: '', status: '', redirect: false, redirectUrl: '', back: ''};
        Object.keys(update).forEach((e) => update[e] !== undefined ?  data[e] = update[e] : '');
        localStorage.setItem('flashMessage', JSON.stringify(data));
    },
    reset: () => {
        const data = {msg:'', status:'', redirect:false, redirectUrl:'', back: ''}
        localStorage.setItem('flashMessage', JSON.stringify(data));
    }
}