import React, {Component} from 'react';
import '../styles/App.css';
import '../styles/login.css';



import ChatApp from './ChatApp';
import Register from './Register';
import _ from "lodash";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            users: []
        };

        // la gestionnaires d'événements.
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);


    }


  componentDidMount() {
        setInterval(() => {
                return fetch('http://localhost:8080/users', {
                    method: 'GET'
                }).then((response) => {
                    response.json().then((users) => {
                        let output = [];

                        _.each(users, function ( user) {
                           output.push({id: user.id, username: user.username});
                        });

                        this.setState({users: output});
                    });
                });
            }
            , 5000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    usernameChangeHandler(event) { // le user
        this.setState({username: event.target.value, password: event.target.value});
    }


    usernameSubmitHandler(event) {  //  action sur le formulaire
        event.preventDefault();
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {

                if (body.err && body.err !== 'undefined') {
                    this.setState({error: body.err});
                }
                else {
                    localStorage.setItem('user', JSON.stringify(body));

                    const output = this.state;
                    output.users.push({id: `${body._id}`, username: `${body.username}`});
                    output.submitted = true;
                    output.username = `${body.username}`;
                    output.password = `${body.password}`;

                    this.setState(output);
                }
            });
        })
    };


    handleClick(event) {
        event.preventDefault();

        this.setState({button: true});
    }


    render() {

        if (this.state.submitted) {
            // Le formulaire a été soumis, maintenant afficher l'application principale
           return (
                <ChatApp username={this.state.username} password={this.state.password} users={this.state.users}

                />

            );
        }
        else if (this.state.button) {
            return (
                <Register/>
            );

        }
        else {


            return (
                <div>
                    <div>
                        <p>{this.state.error}</p>
                    </div>
                    <form onSubmit={this.usernameSubmitHandler} className="username-container">
                        <h1>TChat</h1>
                        <div>
                            <input
                                type="text"
                                onChange={this.usernameChangeHandler}
                                placeholder="Enter a pseudo....."
                                required
                            />

                            <input
                                type="password"
                                placeholder="Enter your Password"
                                onChange={this.usernameChangeHandler}
                                required
                            />

                        </div>

                        <input type="submit" value="Submit"/>
                        <br/>

                        <a href="" onClick={this.handleClick}>
                            Register
                        </a>


                    </form>
                </div>
            );

        }
    }


}


export default App;








