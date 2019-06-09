export const ioServers = {
  init(ioServerEditor, ioServerDevice) {
    this.ioServerEditor = ioServerEditor;
    this.ioServerDevice = ioServerDevice;

    this.ioServerEditor.on('connection', this.onConnectionEditor.bind(this));
    this.ioServerDevice.on('connection', this.onConnectionDevice.bind(this));
  },
  onConnectionEditor(socket) {
    socket.on('press', function () {
      console.warn('PRESS');
    });

    console.warn('[editor] socket connected');
  },
  onConnectionDevice(socket) {
    socket.on('disconnect', function () {
      console.warn(`[device] disconnect (${socket.id})`);
      this.ioServerEditor.emit('device.disconnect', { id: socket.id });
    }.bind(this));

    console.warn(`[device] connect (${socket.id})`);
    this.ioServerEditor.emit('device.connect', { id: socket.id });
  },
};
