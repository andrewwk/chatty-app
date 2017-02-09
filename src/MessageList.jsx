import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render(){
    const {messageList} = this.props;
    const usernameChangeNotification = (name) => {
      if (name.length > 0) {
        return (
          <div className="message system" >
            {name}
          </div>
        )
      }
    }
    return (
      <main className="messages">
        {messageList.map((m) => {
          return (
            <Message key={m.uuid} message={m} />
          )
        })}
        {usernameChangeNotification(this.props.notification)}
      </main>
    );
  }
}
export default MessageList;
