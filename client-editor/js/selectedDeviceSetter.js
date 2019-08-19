import { devicesStorage, } from '/common/devicesStorage.mjs';

export const selectedDeviceSetter = {
  onDeviceDisconnect(app, deviceId) {
    if (app.selectedDevice && app.selectedDevice.id === deviceId) {
      app.selectedDevice = null;
    }
  },
  onDeviceClick(app, deviceId) {
    app.selectedDevice = devicesStorage.get(deviceId);
  },
};
