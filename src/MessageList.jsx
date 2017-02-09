import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render(){

    const {messageList} = this.props;
    const usernameChangeNotificaiton = (name) => {
      if (name.length > 0) {
        return name;
      }
    }
    return (
      <main className="messages">
        {messageList.map((m) => {
          return (
            <Message key={m.uuid} message={m} />
          )
        })}
        <div className="message system" >
          {this.props.notification}
        </div>
      </main>
    );
  }
}
export default MessageList;
