const http = require('http');
const express = require('express');
const myIO = require('./io.js');
const port = 3000;

const app = express();
app.use('/', express.static('client'));
const httpServer = http.Server(app);

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
myIO.init(httpServer);
