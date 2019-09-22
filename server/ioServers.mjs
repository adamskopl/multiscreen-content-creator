import { factoryDevice, } from '../common/factoryDevice.mjs';
import { devicesStorage, } from '../common/devicesStorage.mjs';

let content = {
  html: '',
};

export const ioServers = {
  init(ioServer) {
    this.nspDevices = ioServer.of('/devices');
    this.nspEditor = ioServer.of('/editor');

    this.nspDevices.on('connect', this.onConnectDevice.bind(this));
    this.nspEditor.on('connect', this.onConnectEditor.bind(this));
  },
  onConnectEditor(socket) {
    // get connected devices
    socket.on('devices.get', (cb) => {
      this.nspDevices.clients((error, clients) => {
        cb(clients.map(id => devicesStorage.getBySocketId(id)));
      });
    });

    socket.on('content.update', (editorContent) => {
      Object.assign(content, editorContent);
      this.nspDevices.emit('content.update', content);
    });

    socket.on('device.update', (device) => {
      devicesStorage.add([device]);
      this.nspDevices.to(device.socketId).emit(
        'device.update',
        devicesStorage.get(device.id)
      );
    });
  },
  onConnectDevice(socket) {
    socket.on('disconnect', () => {
      console.warn(`servers device.disconnect ${socket.id}`);
      const device = devicesStorage.getBySocketId(socket.id);
      device.socketId = null;
      this.nspEditor.emit('device.disconnect', device.id);
    });

    socket.on('device.get', (id, cb) => {
      cb(devicesStorage.get(id));
    });

    socket.on('device.login', (id, cb) => {
      console.warn(`servers device.login ${id}`);
      devicesStorage.add([
        devicesStorage.get(id)
        || factoryDevice.create({ id })
      ]);
      devicesStorage.get(id).socketId = socket.id;
      cb(devicesStorage.get(id));
    });

    socket.on('device.update', (device) => {
      devicesStorage.add([device]);
      this.nspEditor.emit('device.update', devicesStorage.get(device.id));
    });

    socket.on('content.get', (cb) => {
      cb(content);
    });

    console.warn(`[device] connect ${socket.id}`);
  },
};
