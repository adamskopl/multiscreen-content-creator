import { factoryDevice, } from './factories.js';
import {} from './devicesRenderer/devicesRenderer.js';

const app = new Vue({
  el: '#app',
  data: {
    devices: new Map(), // @key {string} device id, @value {device}
    clientWidth: null,
    clientHeight: null,
    testImgSrc: 'assets/test-grid.jpg',
  },
  methods: {
    onDeviceClick(id) {
      const editorAreaElement = document
        .querySelector('.editor-area__content-container');
      this.socket.emit('test-html', {
        id,
        html: editorAreaElement.innerHTML,
      });
    },
    onResize() {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
    },
    onDeviceLogin(deviceData) {
      let replacedDevice = this.devices.get(deviceData.id);
      let device = factoryDevice.create({
        id: deviceData.id,
        x: (deviceData.x === undefined)
          ? replacedDevice && replacedDevice.x : undefined,
        y: (deviceData.y === undefined)
          ? replacedDevice && replacedDevice.y : undefined,
        width: deviceData.width,
        height: deviceData.height,
      });

      if (this.devices.get(deviceData.id)) {
        this.onDeviceDisconnect(deviceData);
      }
      this.devices.set(device.id, device);
      this.devicesRenderer.drawDevice(device);
      this.onDeviceClick(device.id);
    },
    onDeviceDisconnect(deviceData) {
      if (this.devices.get(deviceData.id)) {
        this.devicesRenderer.destroyDevice(this.devices.get(deviceData.id));
        this.devices.delete(deviceData.id);
      }
    },
    onDevicePositionChange(positionData) {
      const device = this.devices.get(positionData.deviceId);
      device.x = positionData.x;
      device.y = positionData.y;

      this.socket.emit('device.transform', {
        deviceId: device.id,
        translateX: device.x,
        translateY: device.y,
      });
    },
  },
  mounted() {
    this.devicesRenderer = this.$refs.devicesRenderer;
    this.socket = io('/editor');
    this.socket.on('device.login', this.onDeviceLogin.bind(this));
    this.socket.on('device.disconnect', this.onDeviceDisconnect.bind(this));

    window.addEventListener('resize', this.onResize);

    this.onResize();
    this.socket.emit('device.relogin');
  },
});
