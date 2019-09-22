const devices = [];

export const devicesStorage = {
  get(deviceId) {
    return devices.find(d => d.id === deviceId);
  },
  getAll() {
    return devices;
  },
  getBySocketId(socketId) {
    return devices.find(device => device.socketId === socketId);
  },
  add(newDevices) {
    newDevices.forEach(d => this.delete(d.id));
    devices.push(...newDevices);
  },
  delete(deviceId) {
    const index = devices.findIndex(d => d.id === deviceId);
    if (index !== -1) {
      devices.splice(index, 1);
    }
  },
};
