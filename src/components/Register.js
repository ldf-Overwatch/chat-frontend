import React, { Component } from 'react';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            username: '',
            password: '',
            email: '',
            name: '',
            value: '',


        };

        // la gestionnaires d'événements.
        this.useChangeHandler = this.useChangeHandler.bind(this);
        this.useSubmitHandler = this.useSubmitHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.emaileChangeHandler = this.emaileChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.nameChangeHandler=this.nameChangeHandler.bind(this)


    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    useChangeHandler(event) {
        this.setState({
            username: event.target.value,
        });
    }

    passwordChangeHandler(event) {
        this.setState({
            password: event.target.value

        });

    }


    emaileChangeHandler(event) {
        this.setState({
            email: event.target.value
        });
    }

    nameChangeHandler(event) {
        this.setState({
             name: event.target.value,
        })

}


    useSubmitHandler(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('file', this.uploadInput.files[0]);
        data.append('password', this.state.password);
        data.append('email', this.state.email);
        data.append('name', this.state.name);
        fetch('http://localhost:8080/registration', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {

                if(response.status === 200) {


                        alert('vous êtes inscrit' + this.state.value);
                        this.setState({
                            submitted: true,
                            username: `${body.username}`,
                            password: `${body.password}`,
                            email: `${body.email}`,
                            name: `${body.name}`,
                            file: `http://localhost:8080/${body.image}`

                        });

                }
                else if(response.status === 500){
                    alert('compte existe déjà');
                }
                else if(response.status === 403){
                    alert('image manquante');
                }
                else {
                    alert('error inconnu');
                }


            });

        });
    }

    render() {

        return (

            <form onSubmit={this.useSubmitHandler} className="username-container">
                <h1>Inscription TChat</h1>
                <div>
                    <label>
                        Upload file:
                        <input ref={(ref) => {
                            this.uploadInput = ref;
                        }} type="file"/>
                    </label>
                    <input
                        type="text"
                        onChange={this.nameChangeHandler}
                        placeholder="name..."
                        required
                    />
                    <input
                        type="text"
                        onChange={this.useChangeHandler}
                        placeholder="pseudo....."
                        required
                    />
                    <input
                        type="text"
                        onChange={this.emaileChangeHandler}
                        placeholder="email..."
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your Password"
                        onChange={this.passwordChangeHandler}
                        required
                    />

                </div>
                <input type="submit"  value={this.state.value} onChange={this.handleChange} />
                <br/>

                <a href="" onClick={this.handleClick}>
                    Espace Connect
                </a>

            </form>

        );

    }

}

export default Register;

