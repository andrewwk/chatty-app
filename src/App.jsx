import React, {Component} from 'react';
import Styles             from '../styles/application.scss';
import NavBar             from './NavBar.jsx';
import MessageList        from './MessageList.jsx';
import ChatBar            from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      username: '',
    }
  }
  // Function passed to chatbar to handle username changes.
  onUsernameChange = (name) => {
    this.setState(
      {
        username: name
      }
    )
  }
  // Function that sends new messages to web socket server.
  sendMessage = (username, message) => {
    this.socket.send(
      JSON.stringify(
        {
          username: username,
          content: message
        }
      )
    )
  }
  // Function passed to chatbar to handle new messages. Calls sendMessage function to send message data to web socket server.
  onMessageSubmit = (username, message) => {
    this.sendMessage(username, message)
  }
  // Function that receives new message data from the server and sets the state for message content, username, and uuid.
  onReceivingDataFromServer = (data) => {
    const message    = JSON.parse(data);
    const username   = message.username;
    const content    = message.content;
    const uuid       = message.uuid;
    const newMessage = this.state.messages;
    newMessage.push(
      {
        username: username,
        content : content,
        uuid    : uuid
      }
    )
    this.setState({
      messages: newMessage
    })
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
        <NavBar />
        <MessageList
          messageList={this.state.messages}
          />
        <ChatBar
          currentUser={this.onUsernameChange}
          onMessageSubmit={this.onMessageSubmit}
          />
      </div>
    );
  }
}
export default App;
