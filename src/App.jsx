import React, {Component} from 'react';
import Styles             from '../styles/application.scss';
import NavBar             from './NavBar.jsx';
import MessageList        from './MessageList.jsx';
import ChatBar            from './ChatBar.jsx';

const makeID = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(let i=0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 123
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 456
        }
      ],
      currentUser: 'Anonymous1'
    };
  }

  onMessageSubmit = (message) => {
    console.log(message);
    // if (!currentUser) {
      let currentUser = 'anonymous'
    // }
    let newMessageArray = this.state.messages
    newMessageArray.push(
      {
        username: currentUser,
        content: message
      }
    )
    console.log("newMessageArray", newMessageArray);
    this.setState({
      messages: newMessageArray
    })
  }

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <MessageList
          messageList={this.state.messages}
          />
        <ChatBar
          currentUser={this.state.currentUser}
          onMessageSubmit={this.onMessageSubmit}
          />
      </div>
    );
  }
}
export default App;
