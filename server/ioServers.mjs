export const ioServers = {
  init(ioServerEditor, ioServerDevice) {
    this.ioServerEditor = ioServerEditor;
    this.ioServerDevice = ioServerDevice;

    this.ioServerEditor.on('connection', this.onConnectionEditor.bind(this));
    this.ioServerDevice.on('connection', this.onConnectionDevice.bind(this));

    this.devices = new Map();
  },
  onConnectionEditor(socket) {
    socket.on('press', function () {
      
    });

    socket.on('device.list', function (cb) {
      const devices = [];
      this.devices.forEach(function (value, key) {
        devices.push({ id: key });
      });
      cb(devices);
    }.bind(this));

    console.warn('[editor] socket connected');
  },
  onConnectionDevice(socket) {
    socket.on('disconnect', function () {
      console.warn(`[device] disconnect (${socket.id})`);
      this.ioServerEditor.emit('device.disconnect', { id: socket.id });
      this.devices.delete(socket.id);
    }.bind(this));

    console.warn(`[device] connect (${socket.id})`);
    this.devices.set(socket.id, {});
    this.ioServerEditor.emit('device.connect', { id: socket.id });
  },
};
