import {} from '/common/components/scaleSetter.js';
import {} from '/common/directives/dragEvents.js';
import {} from './components/deviceImage.js';
import { selectedDeviceSetter, } from './selectedDeviceSetter.js';
import { store, } from './store.js';

function getHtmlContent() {
  const editorAreaElement = document
    .querySelector('.editor-area__content-container');
  return editorAreaElement.innerHTML;
}

let app = new Vue({
  el: '#app',
  data: {
    testImgSrc: 'assets/test-bobby-burger-grid.jpg',
    selectedDevice: null,
    socket: store.state.socket,
    devices: store.state.devices
  },
  methods: {
    onDeviceDisconnect(deviceId) {
      selectedDeviceSetter.onDeviceDisconnect(this, deviceId);
      store.devices.delete(deviceId);
    },
    onDeviceClick(device) {
      selectedDeviceSetter.onDeviceClick(app, device);
    },
    onDeviceUpdate(device) {
      store.devices.add([device]);
      selectedDeviceSetter.onDeviceUpdate(app, device);
    },
  },
  mounted() {
    this.socket.on('connect', () => {});

    this.socket.on('device.update', this.onDeviceUpdate.bind(this));
    this.socket.on('device.disconnect', this.onDeviceDisconnect.bind(this));

    this.socket.emit('devices.get', (devices) => {
      store.devices.add(devices);
    });

    this.socket.emit('content.update', {
      html: getHtmlContent(),
    });
  },
});
