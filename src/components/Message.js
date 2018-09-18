import React, {Component} from 'react';
import '../styles/message.css';

class  Message  extends   Component  {


    render() {
        // Le message a été envoyé par l'utilisateur actuel.
        const fromMe = this.props.fromMe ? 'from-me' : '';
        return (
            <div className={`message ${fromMe}`}>
                <div className='username'>
                    <img className='image' src={this.props.file} alt={this.props.username} />
                </div>
                <div className='message-body'>
                    <img className='image' src={'http://localhost:8080/'+this.props.upload} alt={this.props.upload}  />
                    { this.props.message }
                    </div>
            </div>
        );
    }

}

Message.defaultProps = {
    message: '',
    username: '',
    file:'',
    upload:'',
    fromMe: false
};

export  default  Message ;


