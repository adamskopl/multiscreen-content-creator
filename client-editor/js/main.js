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
    clientWidth: null,
    clientHeight: null,
    testImgSrc: 'assets/test-grid.jpg',
  },
  methods: {
    onResize() {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
    },
    onDeviceDisconnect(deviceData) {
      this.devicesRenderer.destroyDevice(deviceData.id);
    },
    onDevicePositionChange(positionData) {
      this.socket.emit('device.update',
        positionData.id, {
          x: positionData.x,
          y: positionData.y,
        });
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

    this.socket.emit('content.update', { html: getHtmlContent(), });
  },
});
