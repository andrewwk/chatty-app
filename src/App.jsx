import React, {Component} from 'react';
import Styles             from '../styles/application.scss';
import NavBar             from './NavBar.jsx';
import MessageList        from './MessageList.jsx';
import ChatBar            from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages    : [],
      username    : '',
      notification: '',
      clients     : 'No clients connected yet'
    }
  }
  postNotification = (name) => {
    this.socket.send(
      JSON.stringify(
        {
          username: name,
          type    : 'postNotification'
        }
      )
    )
  }
  // Function passed to chatbar to handle username changes.
  onUsernameChange = (name) => {
    this.postNotification(name);
  }
  // Function that sends new messages to web socket server.
  sendMessage = (username, message) => {
    this.socket.send(
      JSON.stringify(
        {
          username: username,
          content : message,
          type    : 'postMessage'
        }
      )
    )
  }
  // Function passed to chatbar to handle new messages. Calls sendMessage function to send message
  // data to web socket server.
  onMessageSubmit = (username, message) => {
    this.sendMessage(username, message);
  }
  // Function that receives new message data from the server and sets the state for message
  // content, username, and uuid.
  onReceivingDataFromServer = (data) => {
    const message    = JSON.parse(data);
    switch (message.type) {
      case 'postMessage':
        this.onReceivingNewMessage(message);
        break;
      case 'incomingNotification':
        this.onPostNotificaiton(message.username)
        break;
      case 'clientConnections':
        this.setState(
          {
            clients: message.message
          }
        )
        break;
      default:
        throw new Error (`Unknown postMessage type: ${postMessage.type}`);
    }
  }
  // Function to receive new message data from web socket server, create a new message object
  // and add set that to the message state.
  onReceivingNewMessage = (message) => {
    const username    = message.username;
    const content     = message.content;
    const uuid        = message.uuid;
    const type        = message.type;
    const postMessage = this.state.messages;
    postMessage.push(
      {
        username: username,
        content : content,
        uuid    : uuid,
        type    : type
      }
    )
    this.setState({
      messages: postMessage
    })
  }
  // Notify users of username change
  onPostNotificaiton = (username) => {
    this.setState(
      {
        notification: username
      }
    )
  }
  componentDidMount(){
    // After component mounts, client establishes connection with web socket server.
    this.socket = new WebSocket('ws://localhost:4000')
    // Sending message to server after connection is established
    this.socket.onopen = (event) => {
      console.log(`Client connected to Web Socket Server.`);
      // this.socket.send(JSON.stringify(message));
    }
    // Receving messages from server
    this.socket.onmessage = (event) => {
      this.onReceivingDataFromServer(event.data);
    }
  }
  render() {
    return (
      <div className="app-container">
        <NavBar connectedClients={this.state.clients} />
        <MessageList
          messageList={this.state.messages}
          />
        <ChatBar
          currentUser={this.onUsernameChange}
          onMessageSubmit={this.onMessageSubmit}
          onUsernameChange={this.onUsernameChange}
          notificaiton={this.state.notification}
          />
      </div>
    );
  }
}
export default App;
