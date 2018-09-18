import React, {Component} from 'react';


class  FileInput extends Component{

    constructor(props) {
        super(props);
        this.state = {
            file: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    onFormSubmit(event) {
        event.preventDefault();// Stop form submit

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ file: `http://localhost:8080/${body.file}` });
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} >

            </form>
        );
    }


}
export  default FileInput ;