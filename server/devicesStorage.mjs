// @key {string} device id, @value {device}
const devices = new Map();

export const devicesStorage = {
  get(deviceId) {
    return devices.get(deviceId);
  },
  getBySocketId(socketId) {
    return Array.from(devices.values())
      .find(device => device.socketId === socketId);
  },
  set(deviceId, device) {
    devices.set(deviceId, device);
  },
  delete(deviceId) {
    devices.delete(deviceId);
  },
};
