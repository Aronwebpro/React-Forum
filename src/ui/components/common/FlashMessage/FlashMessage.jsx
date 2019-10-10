import React from 'react';
import PropTypes from 'prop-types';
import {FlashMessageHandler} from '../../../../lib/utils/FlashMessageHandler';
import './FlashMessage.css';



/**
 * Flash Message Component shows messages to user
 */
const FlashMessage = (props) => {
        const {
            msg,
            status
        } = props;
    
        //Reset Flash Animation
        let flash;
        setTimeout(() => { 
            if (!flash) return;
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

FlashMessage.propTypes = {
    msg: PropTypes.string.isRequired,
    status: PropTypes.string,
};

export {
    FlashMessage,
}