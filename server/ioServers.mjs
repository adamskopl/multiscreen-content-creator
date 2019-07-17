import { factoryDevice, } from './factories.mjs';
import { devicesStorage, } from './devicesStorage.mjs';

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

    socket.on('device.update', (id, updatedDevice) => {
      const device = devicesStorage.get(id);
      Object.assign(device, updatedDevice);
      this.nspDevices.to(device.socketId).emit(
        'device.update',
        devicesStorage.get(id)
      );
    });
  },
  onConnectDevice(socket) {
    socket.on('disconnect', () => {
      const device = devicesStorage.getBySocketId(socket.id);
      device.socketId = null;
      this.nspEditor.emit('device.disconnect', {
        id: device.id,
      });
      console.warn(`disconnect ${socket.id}`);
    });

    socket.on('device.get', (id, cb) => {
      cb(devicesStorage.get(id));
    });

    socket.on('device.login', (id, cb) => {
      const device = devicesStorage.get(id)
        || devicesStorage.set(id, factoryDevice.create({
          id,
          x: 0,
          y: 0,
        }));
      device.socketId = socket.id;
      cb(device);
    });

    socket.on('device.update', (id, device) => {
      Object.assign(devicesStorage.get(id), device);
      this.nspEditor.emit('device.update', devicesStorage.get(id));
    });

    socket.on('content.get', (cb) => {
      cb(content);
    });

    console.warn(`[device] connect ${socket.id}`);
  },
};
