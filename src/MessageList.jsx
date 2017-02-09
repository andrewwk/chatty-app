import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  // Function to render username change notifcaitons. First validates whether or not content exists.
  onUsernameChangeNotification = (notification) => {
    if (notification.length > 0 && notification.length !== '' && notification.length !== null) {
      return (
        <div className="message system" >
          {notification}
        </div>
      )
    }
  }

  render(){
    const {messageList} = this.props;
    return (
      <main className="messages">
        {messageList.map((m) => {
          return (
            <Message key={m.uuid} message={m} userColour={m.userColour}/>
          )
        })}
        {this.onUsernameChangeNotification(this.props.notification)}
      </main>
    );
  }
}
export default MessageList;
