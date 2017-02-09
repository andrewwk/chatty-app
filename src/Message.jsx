import React, {Component} from 'react';

class Message extends Component {
  render(){
    const {message} = this.props;

    const usernameDisplay = (name) => {
      if (name.length === 0) {
        return "Anonymous";
      } else {
        return name;
      }
    }

    return (
      <div className="message">
        <span className="message-username">
          {usernameDisplay(message.username)}
        </span>
        <span className="message-content">
          {message.content}
        </span>
      </div>

    );
  }
}
export default Message;
