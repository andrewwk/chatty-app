import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message    : '',
      currentUsername: '',
      oldUsername : ''
    };
  }
  handleMessageChange = (event) => {
    this.setState({message: event.target.value});
  }
  handleMessageEnterPress = (event) => {
    if (event.keyCode === 13) {
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
  // Function to store old username when a user clicks on the username bar to ostensibly change
  // their username
  onClickHandleUsernameChange = (event) => {
    this.setState({oldUsername: event.target.value})
  }
  // Function that sets the currentUsername when the username is changed.
  onChangeHandleUsernameChange = (event) => {
    this.setState({currentUsername: event.target.value})
  }
  // Function to send notifications on username changes.
  handleUsernameEnterPress = (event) => {
     if (event.keyCode === 13) {
       this.props.onUsernameChange(this.state.oldUsername, this.state.currentUsername)
     }
   }

  render(){
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.currentUser}
          onChange={this.onChangeHandleUsernameChange}
          onKeyUp={this.handleUsernameEnterPress}
          onFocus={this.onClickHandleUsernameChange}
          />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleMessageChange}
          onKeyUp={this.handleMessageEnterPress}
          />
      </footer>
    );
  }
}
export default ChatBar;
