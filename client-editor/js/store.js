import { devicesStorage, } from '/common/devicesStorage.mjs';

const state = {
  devices: devicesStorage.getAll(),
  socket: io('/editor'),
};

export const store = {
  state,
  devices: {
    get(deviceId) {
      return devicesStorage.get(deviceId);
    },
    add(devices) {
      devicesStorage.add(devices);
    },
    delete(deviceId) {
      devicesStorage.delete(deviceId);
    },
    modify(device, sourceObject) {
      if (devicesStorage.get(device.id) === undefined) {
        console.error(`changeDevice() device with ${device.id} id not in store`);
      }
      Object.assign(device, sourceObject);
      state.socket.emit('device.update', device);
    },
  },
};
