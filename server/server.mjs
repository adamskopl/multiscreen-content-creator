import http from 'http';
import express from 'express';
import IOServer from 'socket.io';
import uuid from 'uuid/v1';

import { ioServers, } from './ioServers.mjs';

let app = express();
let port = 3000;
let httpServer = null;

app.all('/', (req, res) => {
  res.redirect('/editor');
});
app.use('/editor', express.static('client-editor'));

app.get('/devices', (req, res) => {
  // redirect to the random id
  res.redirect(`/devices/${uuid().substr(0, 8)}`); // only part of uuid used
});
app.use('/devices/:id', express.static('client-device'));

app.use('/*/assets', express.static('assets'));
app.use('/*/libs', express.static('libs'));

httpServer = http.Server(app);
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

ioServers.init(IOServer(httpServer));
