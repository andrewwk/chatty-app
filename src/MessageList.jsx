import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render(){

    const {messageList} = this.props;

    return (
      <main className="messages">
        {messageList.map((m, index) => {
          return (
            <Message key={index} message={m} />
          )
        })}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;
