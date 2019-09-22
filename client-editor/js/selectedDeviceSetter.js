import { devicesStorage, } from '/common/devicesStorage.mjs';

export const selectedDeviceSetter = {
  onDeviceDisconnect(app, deviceId) {
    if (app.selectedDevice && app.selectedDevice.id === deviceId) {
      app.selectedDevice = null;
    }
  },
  onDeviceClick(app, device) {
    app.selectedDevice = device;
  },
  onDeviceUpdate(app, device) {
    if (app.selectedDevice && app.selectedDevice.id === device.id) {
      app.selectedDevice = device;
    }
  },
};
