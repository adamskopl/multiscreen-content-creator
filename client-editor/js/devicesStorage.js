// @key {string} device id, @value {device}
const devices = new Map();

export const devicesStorage = {
  get(deviceId) {
    return devices.get(deviceId);
  },
  set(deviceId, device) {
    devices.set(deviceId, device);
  },
  delete(deviceId) {
    devices.delete(deviceId);
  },
};
