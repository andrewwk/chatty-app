import React, {Component} from 'react';
import Styles             from '../styles/application.scss';
import NavBar             from './NavBar.jsx';
import MessageList        from './MessageList.jsx';
import ChatBar            from './ChatBar.jsx';

// {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
// }


class App extends Component {
  constructor(props) {
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

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <MessageList messageList={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
