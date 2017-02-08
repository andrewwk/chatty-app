import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      currentUser: 'Anonymous'
    };
  }
  handleMessageChange = (event) => {
    this.setState({message: event.target.value});
  }
  handleUsernameChange = (event) => {
    this.setState({currentUser: event.target.value})
  }
  handleMessageEnterPress = (event) => {
    if (event.keyCode === 13) {
      this.props.onMessageSubmit(this.state.message)
      this.setState({message: ''})
    }
  }
  handleUsernameEnterPress = (event) => {
    if (event.keyCode === 13) {
      this.setState({currentUser: 'Anonymous'})
    }
  }
  render(){

    const {currentUser} = this.props;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name  (Optional)"
          value={this.state.currentUser} onKeyUp={this.handleUsernameEnterPress}
          onChange={this.handleUsernameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          value={this.state.message} onChange={this.handleMessageChange}
          onKeyUp={this.handleMessageEnterPress} />
      </footer>
    );
  }
}
export default ChatBar;
