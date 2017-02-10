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

// Function that creates a new message object that will be broadcasted to all connected clients
const handlePostMessage = (postMessage) => {
  return {
    username   : postMessage.username,
    content    : postMessage.content,
    userColour : postMessage.userColour,
    uuid       : uuid.v4(),
    type       : 'incomingMessage'
  }
}

// Function to create imcomingNotification message object that gets sent to all connected clients.
const handlePostNotification = (content) => {
  return {
    content : content,
    type    : 'incomingNotification'
  }
}

// Array of colours that will be assigned to each web socket connection/client/user
const usernameColours = [
  'rgb(52, 73, 94)',
  'rgb(22, 160, 133)',
  'rgb(142, 68, 173)',
  'rgb(41, 128, 185)',
  'rgb(192, 57, 43)',
  'rgb(211, 84, 0)',
  'rgb(52, 152, 219)',
  'rgb(155, 89, 182)',
  'rgb(230, 126, 34)',
  'rgb(241, 196, 15)',
  'rgb(46, 204, 113)',
  'rgb(231, 76, 60)'
]

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
    message : message,
    type    : 'clientConnections'
  }
}

// Function to broadcast data or message to all clients.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

// Variable to keep track of the number of clients connected. Stored outside of wss on connection
// scope
let connectedClients = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  // When a client connects, client connection variable is updated
  connectedClients += 1;

  // Once a client connection with the web socket server is established, the web socket server
  // assigns a unique colour to the user and sends a message to the client which contains some
  // information that includes the unique colour
  const message =  {
    message      : 'WSS Connection established',
    type         : 'clientConnectionInitialized',
    connectionID : connectedClients,
    userColour   : usernameColours[connectedClients - 1]
  }

  ws.send(JSON.stringify(message))

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

    // Once the web socket server receives a message from a client, it creates a variable
    // which contains the JSON parsed message
    const postMessage = JSON.parse(message)

    // Variable which is reassigned/redefined depending on the message type
    let newType = '';

    // Checks the incoming message type and calls the appropriate function.
    switch(postMessage.type) {
      case 'postNotification':
        let returnNotification = handlePostNotification(postMessage.content)
        wss.broadcast(JSON.stringify(returnNotification));
        break;
      case 'postMessage':
        debugger;
        let returnMessage = handlePostMessage(postMessage)
        wss.broadcast(JSON.stringify(returnMessage));
        break;
      default:
        throw new Error (`Unknown postMessage type: ${postMessage.type}`);
    }
  })

  // When a client disconnects, function is called to send a notification to all clients to indicate
  // how many clients are connected. Notification will be displayed in the nav bar.
  ws.on('close', () => {

    // When a client disconnects, client connection variable is updated
    connectedClients -= 1;

    wss.broadcast(
      JSON.stringify(
        connectedClientsNotification(connectedClients)
      )
    );
    console.log(`Client disconnected Total connected clients: ${connectedClients}`);
  });
});
