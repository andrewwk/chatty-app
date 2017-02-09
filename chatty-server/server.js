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

const handlePostMessage = (postMessage, newType) => {
  const messageToBroadcast = {
    username: postMessage.username,
    content : postMessage.content,
    uuid    : uuid.v4(),
    type    : newType
  }
  return messageToBroadcast;
}
// Function to broadcast data or message to all clients.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};
// Function to create notification that sends the number of connected clients to all connected
// clients
const connectedClientsNotification = (clients) => {
  let message;
  if (clients === 1) {
    message = `${clients} client connected.`
  }
  if (clients > 1) {
    message = `${clients} clients connected.`
  }
  return {
    message: message,
    type   : 'clientConnections'
  }
}
// Variable to keep track of the number of clients connected. Stored outside of wss on connection
// scope
let connectedClients = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  connectedClients += 1;
  // When a client connects, function is called to send a notification to all clients to indicate
  // how many clients are connected. Notification will be displayed in the nav bar.
  wss.broadcast(
    JSON.stringify(
      connectedClientsNotification(connectedClients)
    )
  );
  console.log(`Web Socket Server established connection with client. Total connected clients: ${connectedClients}`);
  // Server receives new message data from client. Server broadcasts message to all clients, adds
  // a uuid, and new message type to the new message object.
  ws.on('message', (message) => {
    const postMessage = JSON.parse(message)
    let newType = '';
    switch(postMessage.type) {
      case 'postNotification':
        newType = 'incomingNotification';
        break;
      case 'postMessage':
        newType = 'incomingMessage';
        let returnMessage = handlePostMessage(postMessage, newType)
        wss.broadcast(JSON.stringify(returnMessage));
        break;
      default:
        throw new Error (`Unknown postMessage type: ${postMessage.type}`)
    }

  })
  // When a client disconnects, function is called to send a notification to all clients to indicate
  // how many clients are connected. Notification will be displayed in the nav bar.
  ws.on('close', () => {
    connectedClients -= 1;
    wss.broadcast(
      JSON.stringify(
        connectedClientsNotification(connectedClients)
      )
    );
    console.log(`Client disconnected Total connected clients: ${connectedClients}`);
  });
});
