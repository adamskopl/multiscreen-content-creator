export const ioServers = {
  init(ioServer) {
    this.nspDevices = ioServer.of('/devices');
    this.nspEditor = ioServer.of('/editor');

    this.nspDevices.on('connection', this.onConnectionDevice.bind(this));
    this.nspEditor.on('connection', this.onConnectionEditor.bind(this));
  },
  onConnectionEditor(socket) {
    socket.on('device.set-html', (data) => {
      this.nspDevices.to(data.id).emit('device.set-html', data.html);
    });

    socket.on('device.relogin', () => {
      this.nspDevices.emit('device.relogin');
    });

    socket.on('device.list', (cb) => {
      this.nspDevices.clients((error, clients) => {
        cb(clients.map(
          id => ({ id, }),
        ));
      });
    });

    socket.on('device.transform', (transformData) => {
      this.nspDevices.to(transformData.deviceId)
        .emit('device.transform', transformData);
    });

    console.warn('[editor] socket connected');
  },
  onConnectionDevice(socket) {
    socket.on('disconnect', () => {
      console.warn(`[device] disconnect (${socket.id})`);
      this.nspEditor.emit('device.disconnect', { id: socket.id });
    });

    socket.on('login', (data) => {
      this.nspEditor.emit('device.login', {
        id: socket.id,
        width: data.width,
        height: data.height,
      });
    });

    console.warn(`[device] connect (${socket.id})`);
  },
};
