import {} from './devicesRenderer/devicesRenderer.js';

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
    onDeviceLogin(device) {
      this.devicesRenderer.destroyDevice(device.id);
      this.devicesRenderer.drawDevice(device);
      const editorAreaElement = document
        .querySelector('.editor-area__content-container');

      this.socket.emit('device.content-change', {
        id: device.id,
        html: editorAreaElement.innerHTML,
        transformData: {
          x: device.x,
          y: device.y,
        },
      });
    },
    onDeviceDisconnect(deviceData) {
      this.devicesRenderer.destroyDevice(deviceData.id);
    },
    onDevicePositionChange(positionData) {
      this.socket.emit('device.content-change', {
        id: positionData.id,
        html: null, // if null, then should be ignored
        transformData: {
          x: positionData.x,
          y: positionData.y,
        },
      });
    },
  },
  mounted() {
    this.devicesRenderer = this.$refs.devicesRenderer;
    this.socket = io('/editor');

    this.socket.on('device.login', this.onDeviceLogin.bind(this));
    this.socket.on('device.disconnect', this.onDeviceDisconnect.bind(this));

    this.socket.on('connect', () => {
      this.socket.emit('device.relogin');
    });
  },
});
