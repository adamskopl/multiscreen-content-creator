export const ioServers = {
  init(ioServerEditor, ioServerDevice) {
    this.ioServerEditor = ioServerEditor;
    this.ioServerDevice = ioServerDevice;

    this.ioServerEditor.on('connection', this.onConnectionEditor.bind(this));
    this.ioServerDevice.on('connection', this.onConnectionDevice.bind(this));
  },
  onConnectionEditor(socket) {
    socket.on('test-html', (data) => {
      this.ioServerDevice.to(data.id).emit('test-html', data.html);
    });

    socket.on('device.list', (cb) => {
      this.ioServerDevice.clients((error, clients) => {
        cb(clients.map(
          id => ({ id }),
        ));
      });
    });

    console.warn('[editor] socket connected');
  },
  onConnectionDevice(socket) {
    socket.on('disconnect', () => {
      console.warn(`[device] disconnect (${socket.id})`);
      this.ioServerEditor.emit('device.disconnect', { id: socket.id });
    });

    socket.on('login', (data) => {
      this.ioServerEditor.emit('device.login', {
        id: socket.id,
        width: data.width,
        height: data.height,
      });
    });

    console.warn(`[device] connect (${socket.id})`);
  },
};
