const Server = require('socket.io');

let server = null;

function init(httpServer) {
  server = Server(httpServer);
  server.on('connection', onConnection);
}

function onConnection(socket) {
  console.warn(`socket connected!`);
}

module.exports = {
  init,
};
