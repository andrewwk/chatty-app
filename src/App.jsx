import React, {Component} from 'react';
import Styles             from '../styles/application.scss';
import NavBar             from './NavBar.jsx';
import MessageList        from './MessageList.jsx';
import ChatBar            from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages     : [],
      username     : '',
      notification : '',
      clients      : 'No clients connected yet',
      userColour   : ''
    }
  }
  // Function to create new mesage object to send to send server to notify all clients of a username
  // change.
  postNotification = (oldUsername, newUsername) => {
    this.socket.send(
      JSON.stringify(
        {
          content : `${oldUsername} changed their name to ${newUsername}`,
          type    :  'postNotification'
        }
      )
    )
  }
  // Function passed to chatbar to handle username changes.
  onUsernameChange = (oldUsername, newUsername) => {
    this.postNotification(oldUsername, newUsername);
  }
  // Function that sends new messages to web socket server.
  sendMessage = (username, message) => {
    this.socket.send(
      JSON.stringify(
        {
          username   : username,
          content    : message,
          type       : 'postMessage',
          userColour : this.state.userColour
        }
      )
    )
  }
  // Function passed to chatbar to handle new messages. Calls sendMessage function to send message
  // data to web socket server.
  onMessageSubmit = (username, message) => {
    this.sendMessage(username, message);
  }
  // Function to receive new message data from web socket server, create a new message object
  // and add set that to the message state. Adds the distinct username colour for the client.
  onReceivingNewMessage = (message) => {
    const username    = message.username;
    const content     = message.content;
    const uuid        = message.uuid;
    const type        = message.type;
    const userColour  = message.userColour;
    const postMessage = this.state.messages;
    postMessage.push(
      {
        username   : username,
        content    : content,
        uuid       : uuid,
        type       : type,
        userColour : userColour
      }
    )
    this.setState({
      messages: postMessage
    })
  }
  // Function to notify users of username change. Sets state for notification to equal content from
  // web socket server.
  onPostNotification = (content) => {
    this.setState(
      {
        notification : content
      }
    )
  }
  // Function that receives new message data from the server, checks the message type, and sets the
  // state for message content, username, uuid, and/or userColour depending on the message type.
  onReceivingDataFromServer = (data) => {
    const message    = JSON.parse(data);
    switch (message.type) {
      case 'clientConnectionInitialized':
        this.setState({userColour: message.userColour})
        break;
      case 'incomingMessage':
        this.onReceivingNewMessage(message);
        break;
      case 'incomingNotification':
        this.onPostNotification(message.content)
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
  componentDidMount(){
    // After component mounts, client establishes connection with web socket server.
    this.socket = new WebSocket('ws://localhost:4000')
    // Sending message to server after connection is established
    this.socket.onopen = (event) => {
      console.log(`Client connected to Web Socket Server.`);
      // this.socket.send(JSON.stringify(message));
    }
    // Receving messages from server. Uses onReceivingDataFromServer function to check message type.
    this.socket.onmessage = (event) => {
      this.onReceivingDataFromServer(event.data);
    }
  }
  
  render(){
    return (
      <div className="app-container">
        <NavBar connectedClients={this.state.clients} />
        <MessageList
          messageList ={this.state.messages}
          notification={this.state.notification}
          />
        <ChatBar
          currentUser     ={this.onUsernameChange}
          onMessageSubmit ={this.onMessageSubmit}
          onUsernameChange={this.onUsernameChange}
          userColour      ={this.state.userColour}
          />
      </div>
    );
  }
}
export default App;
