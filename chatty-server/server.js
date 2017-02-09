const express      = require('express');
const SocketServer = require('ws').Server;
const PORT         = 4000;
const uuid         = require('node-uuid');
// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Function to broadcast to all clients.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log(`Web Socket Server established connection with client`);
  // Server receives new message data from client. Server broadcasts message to all clients and adds a uuid to the  new message object.
  ws.on('message', (message) => {
    const newMessage = JSON.parse(message)
    const messageToBroadcast = {
      username: newMessage.username,
      content : newMessage.content,
      uuid    : uuid.v4()
    }
    wss.broadcast(JSON.stringify(messageToBroadcast));
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
