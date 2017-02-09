const express      = require('express');
const SocketServer = require('ws').Server;
const PORT         = 4000;
// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Broadcast to all.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log(ws);
  ws.on('message', (message) => {
    console.log('Receeived from client', JSON.parse(message));

    wss.broadcast(message);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
