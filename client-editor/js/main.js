import {} from './devicesRenderer/devicesRenderer.js';
import {} from '/common/components/scaleSetter.js';
import { devicesStorage, } from '/common/devicesStorage.mjs';
import { selectedDeviceSetter, } from './selectedDeviceSetter.js';

function getHtmlContent() {
  const editorAreaElement = document
    .querySelector('.editor-area__content-container');
  return editorAreaElement.innerHTML;
}

// device updated or created

const app = new Vue({
  el: '#app',
  data: {
    testImgSrc: 'assets/test-bobby-burger-grid.jpg',
    selectedDevice: null,
    socket: null,
  },
  methods: {
    onDeviceDisconnect(deviceId) {
      devicesStorage.delete(deviceId);
      selectedDeviceSetter.onDeviceDisconnect(this, deviceId);
      this.devicesRenderer.destroyDevice(deviceId);
    },
    onDevicePositionChange(device) {
      Object.assign(devicesStorage.get(device.id), {
        x: device.x,
        y: device.y,
      });
      this.socket.emit('device.update', devicesStorage.get(device.id));
    },
    onDeviceClick(data) {
      this.devicesRenderer.unhighlightDevices();
      this.devicesRenderer.highlightDevice(data.id);
      selectedDeviceSetter.onDeviceClick(app, data.id);
    },
    onDeviceUpdate(device) {
      devicesStorage.set(
        device.id,
        Object.assign(devicesStorage.get(device.id) || {}, device),
      );
      this.devicesRenderer.destroyDevice(device.id);
      this.devicesRenderer.drawDevice(device);
      if (this.selectedDevice && this.selectedDevice.id === device.id) {
        this.devicesRenderer.highlightDevice(device.id);
      }
    },
  },
  mounted() {
    this.devicesRenderer = this.$refs.devicesRenderer;
    this.socket = io('/editor');

    this.socket.on('connect', () => {});

    this.socket.on('device.update', this.onDeviceUpdate.bind(this));
    this.socket.on('device.disconnect', this.onDeviceDisconnect.bind(this));

    this.socket.emit('devices.get', (devices) => {
      devices.forEach((device) => { devicesStorage.set(device.id, device); });
      devices.forEach(this.onDeviceUpdate.bind(this));
    });

    this.socket.emit('content.update', {
      html: getHtmlContent(),
    });
  },
});
