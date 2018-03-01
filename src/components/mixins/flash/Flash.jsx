import React, {Component} from 'react';
import './css/flash.css';

class Flash extends Component {
    
    render() {
        if (!this.props.status || !this.props.text)  return ''; 
        let color;
        setTimeout(() => { 
            if (!this.flash) return
            this.flash.style.animation = 'none';
            this.flash.offsetHeight;
            this.flash.style.animation = null;
        },100);
        switch(this.props.status) {
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
            <div className="flash-wrapper shake" style={ {textAlign: 'center', padding:' 2px', border:'1px solid', borderColor:color } }  ref={ (input => this.flash = input )} >
                <div className="flash"  style={ { fontWeight: 'bold', border:'3px solid', borderColor:color } } >
                    <p>
                        {this.props.text}
                    </p>
                </div>
            </div>    
        )
    }
};

export default Flash;