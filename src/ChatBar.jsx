import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message    : '',
      currentUser: ''
    };
  }
  handleMessageChange = (event) => {
    this.setState({message: event.target.value});
  }
  handleMessageEnterPress = (event) => {
    if (event.keyCode === 13) {
      this.props.onMessageSubmit(
        this.state.currentUser,
        this.state.message
      )
      this.setState(
        {
          message: ''
        }
      )
    }
  }
  handleUsernameChange = (event) => {
    this.setState({currentUser: event.target.value})
  }
  // Function to send notifications on username changes
  handleUsernameEnterPress = (event) => {
    const previousUsername = this.state.currentUser;
    console.log(`PREVIOUSUSERNAME ${previousUsername}`);
     if (event.keyCode === 13) {
       this.props.onUsernameChange(this.state.currentUser)
       console.log(`CURRENTUSER: ${this.state.currentUser}`)
     }
   }

  render(){
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name  (Optional)"
          value={this.state.currentUser}
          onChange={this.handleUsernameChange}
          onKeyUp={this.handleUsernameEnterPress}
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
