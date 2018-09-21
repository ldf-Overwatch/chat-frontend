import React, {Component,  createRef } from 'react';
import io from 'socket.io-client';
import _ from 'lodash';
import config from '../config';
import Messages from './Messages';
import ChatInputAvec from './ChatInputAvec';
import ChatInputSans from './ChatInputSans';
import '../styles/ChatApp.css';
import UserList from './UserList';
import JSEMOJI from 'emoji-js';
import WebCam from "react-webcam";
import { render } from 'react-dom';

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';


class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.webcam = createRef();
        this.state = {
            messages: [],
            message: '',
            isLoading: false,
            emojiShown: false,
            items: [],
            text: '',
            chatInput: '',
            upload: '',
            uploadInput: '',
            file:null,
            webcam : {
                width: window.width,
                height: window.height,
                facingMode: "environment"
            },
            isToggleOn: true
        };


        this.sendHandler = this.sendHandler.bind(this);
        this.submitHandler =this.submitHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.handleEmojiClick =this.handleEmojiClick.bind(this);
        this.toogleEmojiState = this.toogleEmojiState.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeconnectClick = this.handleDeconnectClick.bind (this);




        //Connexion au serveur
        this.socket = io(config.api, {query: `username=${props.username}&file=${props.file}`}).connect();

        //Ecoute des messages du serveur
        this.socket.on('server:message', message => {
            this.addMessage(message);

        });


    }

    handleDeconnectClick (){
        localStorage.removeItem('user');
        window.location.reload();
    }


    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    setRef = webcam => {
        this.webcam = webcam;
    };


    textChangeHandler(event) {
        this.setState({ chatInput: event.target.value });
    }

    onChangeFile(event) {
        this.setState({file: event.target.files[0]});
    }

    submitHandler(event) {
        // Arrête le formulaire d'actualisation de la page sur soumettre
        event.preventDefault();
        //Appelle le rappel onSend avec le message chatInput

        // Effacer la zone de saisie
        this.setState({chatInput: '', upload: '', file:''});
        /*
        les messages du chat
         */

        const data = new FormData();
        data.append('author', JSON.parse(localStorage.getItem('user'))._id);
        data.append('message', this.state.chatInput);
        data.append('file', this.state.file);
        fetch('http://localhost:8080/message', {
            method: 'POST',
            body: data,

        }).then((response) => {
            response.json().then((body) => {
                let output = this.state;

                output.submitted = true;
                output.message = body.message;
                output.upload = body.upload;

                console.log(output);

                this.setState(output);

                //sur la fonction onSend supérieure au component
                this.sendHandler(output.message, output.upload);



            });

        });
    }

    handleEmojiClick = (n, e) => {
        let emoji = jsemoji.replace_colons(`:${e.name}:`);
        this.setState({
            chatInput: this.state.chatInput + emoji
        });
    };


    componentDidMount() {

            this.setState({isLoading: true});

            fetch('http://localhost:8080/history', {
                method: 'GET'
            }).then((response) => {
                response.json().then((messages) => {

                    const output = this.state;
                    output.messages = [];
                    output.isLoading = false;

                    _.each(messages, function (message) {
                        output.messages.push({
                            message: message.message,
                            upload: message.upload,
                            username: '',
                            file: '',
                            fromMe: true
                        });
                    });

                    this.setState({output});
                });
            });
        };


        sendHandler(message, upload) {
            const messageObject = {
                username: this.props.username,
                password: this.props.password,
                email: this.props.email,
                name: this.props.name,
                file: this.props.file,
                upload,
                message,


            };


            // Emet le message sur le serveur
            this.socket.emit('client:message', messageObject);
            messageObject.fromMe = true;
            this.addMessage(messageObject);

        }



        addMessage(message) {
            //  Ajouter le message à l'état du composant
            const messages = this.state.messages;
            messages.push(message);
            this.setState({messages});


        }

    toogleEmojiState = () => {
        this.setState({
            emojiShown: !this.state.emojiShown
        });
    };



            // form
    render() {
                const {messages, isLoading  } = this.state;

                if (isLoading) {
                    return <p>Loading ...</p>;
                }
                else if (this.state.emojiShown) {
                    return (<div className="container">
                        <a href="" onClick={this.handleDeconnectClick}  >
                            Déconnection
                        </a>
                        <button onClick={this.handleClick}>
                            {this.state.isToggleOn ? 'ON' : <WebCam
                                style={{width: "60vw", height: "60vh" }}
                                ref={this.setRef}
                                videoConstraints={this.state.webcam}
                                audio={false} />}

                        </button>
                        <h3>React Chat App
                        </h3>
                            <UserList users={this.props.users}/>
                            <Messages messages={messages}/>
                            <ChatInputAvec
                                chatInput = {this.state.chatInput}
                                upload = {this.state.upload}
                                uploadInput = {this.state.uploadInput}
                                submitHandler={this.submitHandler}
                                toogleEmojiState={this.toogleEmojiState}
                                handleEmojiClick ={this.handleEmojiClick}
                                onChangeFile = {this.onChangeFile}
                            />


                    }
                        </div>)

                    }
             else if (localStorage.getItem('user') &&
                    localStorage.getItem('user') !== 'undefined' &&
                    localStorage.getItem('user').length > 0){
              return (

                  <div className="container">
                      <a href="" onClick={this.handleDeconnectClick}  >
                          Déconnection
                      </a>

                      <button onClick={this.handleClick}>
                          {this.state.isToggleOn ? 'FaceTime' : <WebCam
                              style={{width: "60vw", height: "60vh" }}
                              ref={this.setRef}
                              videoConstraints={this.state.webcam}
                              audio={false} />}
                      </button>
                      <h3>React Chat App
                      </h3>
                     <UserList users={this.props.users}/>
                     <Messages messages={messages}/>
                 <ChatInputSans chatInput = {this.state.chatInput}
                                upload = {this.state.upload}
                                uploadInput = {this.state.uploadInput}
                                toogleEmojiState={this.toogleEmojiState}
                                submitHandler={this.submitHandler}
                                textChangeHandler={this.textChangeHandler}
                                onChangeFile = {this.onChangeFile}

                 />

                  </div>

              )
                }else {
                 return '';
                }

                }

            }


render(<ChatApp />, document.getElementById('root'));


ChatApp.defaultProps = {
    username: ' ',
    file:'',
    password :'',
    users: []
};

export default ChatApp;
