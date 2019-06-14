import http from 'http';
import express from 'express';
import IOServer from 'socket.io';

import { ioServers, } from './ioServers.mjs';

let app = express();
let port = 3000;
let httpServer = null;

app.all('/', (req, res) => {
  res.redirect('/editor');
});
app.use('/editor', express.static('client-editor'));

app.get('/devices', (req, res) => {
  // TODO add devices manager or something like that
  res.redirect('/devices/123');
});
app.use('/devices/:id', express.static('client-device'));

app.use('/*/assets', express.static('assets'));
app.use('/*/libs', express.static('libs'));

httpServer = http.Server(app);
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

ioServers.init(IOServer(httpServer));
