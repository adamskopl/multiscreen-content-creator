import http from 'http';
import express from 'express';
import IOServer from 'socket.io';

import { ioServers } from './ioServers.mjs';

const servers = {
  editor: {
    app: express(),
    port: 3001,
    httpServer: null,
    ioServer: null,
  },
  device: {
    app: express(),
    port: 3000,
    httpServer: null,
    ioServer: null,
  },
};

servers.editor.app.use('/', express.static('client-editor'));
servers.editor.httpServer = http.Server(servers.editor.app);
servers.editor.httpServer.listen(servers.editor.port, () => {
  console.log(`[editor] listening on port ${servers.editor.port}`);
});
servers.editor.ioServer = IOServer(servers.editor.httpServer);

servers.device.app.use('/', express.static('client-device'));
servers.device.httpServer = http.Server(servers.device.app);
servers.device.httpServer.listen(servers.device.port, () => {
  console.log(`[device] listening on port ${servers.device.port}`);
});
servers.device.ioServer = IOServer(servers.device.httpServer);

ioServers.init(servers.editor.ioServer, servers.device.ioServer);
