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



    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    useChangeHandler(event) {
        this.setState({
            email: event.target.value, name: event.target.value,
            username: event.target.value, file: event.target.value, password: event.target.value
        });
    }


    useSubmitHandler(event) {
        alert('you are registered ' + this.state.value);
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

                this.setState({
                    submitted: true,
                    username: `${body.username}`,
                    password: `${body.password}`,
                    email: `${body.email}`,
                    name: `${body.name}`,
                    file: `http://localhost:8080/${body.image}`

                });

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
                        onChange={this.useChangeHandler}
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
                        onChange={this.useChangeHandler}
                        placeholder="email..."
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your Password"
                        onChange={this.useChangeHandler}
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

