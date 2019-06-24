import { factoryDevice, } from './factories.mjs';
import { devicesStorage, } from './devicesStorage.mjs';

export const ioServers = {
  init(ioServer) {
    this.nspDevices = ioServer.of('/devices');
    this.nspEditor = ioServer.of('/editor');

    this.nspDevices.on('connection', this.onConnectionDevice.bind(this));
    this.nspEditor.on('connection', this.onConnectionEditor.bind(this));
  },
  onConnectionEditor(socket) {
    socket.on('disconnect', () => {
      console.warn(`[editor] disconnect ${socket.id}`);
    });

    socket.on('device.content-change', (contentData) => {
      // update stored device
      const device = devicesStorage.get(contentData.id);
      device.x = contentData.transformData.x;
      device.y = contentData.transformData.y;

      this.nspDevices.to(devicesStorage.get(contentData.id).socketId)
        .emit('device.content-change', contentData);
    });

    socket.on('device.relogin', () => {
      this.nspDevices.emit('device.relogin');
    });

    console.warn(`[editor] connect ${socket.id}`);
  },
  onConnectionDevice(socket) {
    socket.on('disconnect', () => {
      this.nspEditor.emit('device.disconnect', {
        id: devicesStorage.getBySocketId(socket.id).id,
      });
      console.warn(`[device] disconnect ${socket.id}`);
    });

    socket.on('device.login', (deviceData) => {
      const replacedDevice = devicesStorage.get(deviceData.id);
      const device = factoryDevice.create({
        id: deviceData.id,
        x: (deviceData.x === undefined)
          ? replacedDevice && replacedDevice.x : undefined,
        y: (deviceData.y === undefined)
          ? replacedDevice && replacedDevice.y : undefined,
        width: deviceData.width,
        height: deviceData.height,
        socketId: socket.id,
      });

      console.warn('onConnectionDevice. setting ', device.id);
      devicesStorage.set(device.id, device);
      this.nspEditor.emit('device.login', device);
    });

    console.warn(`[device] connect ${socket.id}`);
  },
};
