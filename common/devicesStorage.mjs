// @key {string} device id, @value {device}
const devices = new Map();

export const devicesStorage = {
  get(deviceId) {
    return devices.get(deviceId);
  },
  getAll() {
    return Array.from(devices.values());
  },
  getBySocketId(socketId) {
    return Array.from(devices.values())
      .find(device => device.socketId === socketId);
  },
  set(deviceId, device) {
    if (typeof deviceId !== 'string') { console.error('wrong deviceId'); }
    devices.set(deviceId, device);
    return device;
  },
  delete(deviceId) {
    devices.delete(deviceId);
  },
};
