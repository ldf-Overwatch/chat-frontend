import React, {Component } from 'react';
import '../styles/ChatInputSans.css';



class ChatInputSans extends Component  {

    render() {

        return (

            <div>

                <form className="chat-input" onSubmit={this.props.submitHandler}>


                    <label>
                        Upload :
                        <input type="file" onChange={this.props.onChangeFile}/>
                    </label>


                    <input type="text"

                           onChange={this.props.textChangeHandler}
                           value={this.props.chatInput}
                           placeholder="Write a message..."
                           required />

                </form>

                <span id="show-emoji-no" onClick={this.props.toogleEmojiState}>{'🙂'}</span>

            </div>

        );
    }

}




ChatInputSans.defaultProps = {
};

export default  ChatInputSans;

