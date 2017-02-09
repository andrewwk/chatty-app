import React, {Component} from 'react';

class Message extends Component {
  // Function that checks if a username exists. If it exists, it will display the currentUsername.
  // If not, it will display anonymous.
  usernameValidation = (name) => {
    if (name.length === 0 || name === '' || name === null) {
      return "Anonymous";
    } else {
      return name;
    }
  }
  render(){
    const {message} = this.props;

    return (
      <div className="message">
        <span className="message-username">
          {this.usernameValidation(message.username)}
        </span>
        <span className="message-content">
          {message.content}
        </span>
      </div>

    );
  }
}
export default Message;
