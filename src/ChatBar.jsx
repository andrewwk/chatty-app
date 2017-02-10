import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message         : '',
      currentUsername : '',
      oldUsername     : ''
    };
  }

  // Function to set message state. Validates whether or not any characters/content exists before
  // setting the message state.
  handleMessageChange = (event) => {
    if (event.target.value !== '' && event.target.value !== null) {
      this.setState({message: event.target.value});
    }
  }

  // Function to handle if user presses enter after composing a new message. Validates whether a
  // message exists before calling onMessageSubmit function.
  handleMessageEnterPress = (event) => {
    if (event.keyCode === 13 && this.state.message !== '' && this.state.message !== null) {
      this.props.onMessageSubmit(
        this.state.currentUsername,
        this.state.message
      )
      this.setState(
        {
          message: ''
        }
      )
    }
  }

  // Function to handle if user doesn't press enter. Validates whether a message exists before
  // calling onMessageSubmit function.
  onBlurHandleNewMessage = (event) => {
    if (this.state.message !== '') {
      this.props.onMessageSubmit(
        this.state.currentUsername,
        this.state.message,
      )
      this.setState(
        {
          message: ''
        }
      )
    }
  }

  // Function to store old username when a user clicks on the username bar to ostensibly change
  // their username
  onClickHandleUsernameChange = (event) => {
    this.setState({oldUsername: event.target.value});
  }

  // Function that sets the currentUsername when the username is changed.
  onChangeHandleUsernameChange = (event) => {
    this.setState({currentUsername: event.target.value});
  }

  // Function to handle if user doesn't press enter. Validates whether a previous username exists,
  // and then calls onUsernameChange function.
  onBlurHandleUsernameChange = (event) => {
    if (this.state.oldUsername !== '' && this.state.oldUsername !== null) {
      this.props.onUsernameChange(this.state.oldUsername, this.state.currentUsername);
    }
  }

  // Function to send notifications on username changes. Validates whether a previous username
  // exists, and then calls onUsernameChange function.
  handleUsernameEnterPress = (event) => {
     if (event.keyCode === 13 && this.state.oldUsername !== '') {
       this.props.onUsernameChange(this.state.oldUsername, this.state.currentUsername);
     }
   }

  render(){
    return (
      <footer className="chatbar">
        <input
          className  ="chatbar-username"
          placeholder="Your Name (Optional)"
          value      ={this.state.currentUser}
          onChange   ={this.onChangeHandleUsernameChange}
          onBlur     ={this.onBlurHandleUsernameChange}
          onKeyUp    ={this.handleUsernameEnterPress}
          onFocus    ={this.onClickHandleUsernameChange}
          />
        <input
          className  ="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value      ={this.state.message}
          onChange   ={this.handleMessageChange}
          onBlur     ={this.onBlurHandleNewMessage}
          onKeyUp    ={this.handleMessageEnterPress}
          />
      </footer>
    );
  }
}
export default ChatBar;
