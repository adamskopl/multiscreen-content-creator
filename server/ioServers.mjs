export const ioServers = {
  init(ioServerEditor, ioServerDevice) {
    this.ioServerEditor = ioServerEditor;
    this.ioServerDevice = ioServerDevice;

    this.ioServerEditor.on('connection', this.onConnectionEditor.bind(this));
    this.ioServerDevice.on('connection', this.onConnectionDevice.bind(this));

    this.devices = new Map();
  },
  onConnectionEditor(socket) {
    socket.on('editor-test', (id) => {
      this.ioServerDevice.to(id).emit('test-add', 'assets/test.jpg');
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
      this.devices.delete(socket.id);
    });

    console.warn(`[device] connect (${socket.id})`);
    this.devices.set(socket.id, {});
    this.ioServerEditor.emit('device.connect', { id: socket.id });
  },
};
