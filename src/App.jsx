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
  onMessageSubmit = (username, message) => {
    this.sendMessage(username, message)
  }
  onReceivingDataFromServer = (data) => {
    const message    = JSON.parse(data);
    const username   = message.username;
    const content    = message.content;
    const newMessage = this.state.messages;
    newMessage.push(
      {
        username: username,
        content : content
      }
    )
    this.setState({
      messages: newMessage
    })
  }
  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:4000')
    // Sending message to server after connection is established
    this.socket.onopen = (event) => {
      let message = {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        id: 123
      }
      this.socket.send(JSON.stringify(message));
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
