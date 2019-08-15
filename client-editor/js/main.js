import {} from './devicesRenderer/devicesRenderer.js';

function getHtmlContent() {
  const editorAreaElement = document
    .querySelector('.editor-area__content-container');
  return editorAreaElement.innerHTML;
}

function onDeviceUpdate(app, device) {
  app.devicesRenderer.destroyDevice(device.id);
  app.devicesRenderer.drawDevice(device);
}

const app = new Vue({
  el: '#app',
  data: {
    testImgSrc: 'assets/test-bobby-burger-grid.jpg',
  },
  methods: {
    onDeviceDisconnect(deviceData) {
      this.devicesRenderer.destroyDevice(deviceData.id);
    },
    onDevicePositionChange(device) {
      this.socket.emit('device.update',
        device.id, {
          x: device.x,
          y: device.y,
        });
    },
    onDeviceClick(data) {
      this.devicesRenderer.unhighlightDevices();
      this.devicesRenderer.highlightDevice(data.id);
    },
  },
  mounted() {
    this.devicesRenderer = this.$refs.devicesRenderer;
    this.socket = io('/editor');

    this.socket.on('connect', () => {});

    this.socket.on('device.update', onDeviceUpdate.bind(null, this));
    this.socket.on('device.disconnect', this.onDeviceDisconnect.bind(this));

    this.socket.emit('devices.get', (devices) => {
      devices.forEach(onDeviceUpdate.bind(null, this));
    });

    this.socket.emit('content.update', {
      html: getHtmlContent(),
    });
  },
});
