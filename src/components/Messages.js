import React, {Component} from 'react';

import Message from './Message'


class  Messages extends Component  {


    componentDidUpdate() {
    // Il y a un nouveau message dans l'état, faites défiler vers le bas de la liste
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }


    render() {

        //Boucle dans tous les messages de l'état et crée un composant Message
        const messages = this.props.messages.map((message, i) => {

                return (

                    <Message
                        key={i}
                        username={message.username} // nom d'utilisateur - le nom de l'utilisateur qui a envoyé le messag
                        file={message.file}
                        upload={message.upload}
                        message={message.message}
                        fromMe={message.fromMe}

                    />

                );
                });

            return (
                <div className='messages' id='messageList'>
                    {messages}
                </div>
            );
        }
}




export default Messages;