import React, {Component} from 'react'

class NavBar extends Component {

  render(){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <span className="connected-clients">
          {this.props.connectedClients}
        </span>
      </nav>
    );
  }
}
export default NavBar;
