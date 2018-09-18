import React, {Component,} from 'react';
import EmojiPicker from 'emoji-picker-react';

import '../styles/ChatInputSans.css';





class ChatInputAvec extends Component  {

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
                <span id="show-emoji-yes" onClick={this.props.toogleEmojiState}>{'🙂'}</span>
                <div className="emoji-table">
                    <EmojiPicker onEmojiClick={this.props.handleEmojiClick}  />

                </div>

            </div>




        );
    }

}


ChatInputAvec.defaultProps = {
};


export default  ChatInputAvec;