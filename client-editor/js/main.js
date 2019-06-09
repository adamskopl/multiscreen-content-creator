const app = new Vue({
  el: '#app',
  data: {
    devices: [],
    testImgSrc: 'assets/test-border.jpg',
  },
  methods: {
    onDeviceClick(id) {
      const editorAreaElement = document.querySelector('.editor-area');
      this.socket.emit('test-html', {
        id,
        html: editorAreaElement.innerHTML
      });
    },
  },
  created() {
    this.socket = io();

    this.socket.emit('device.list', function (devices) {
      this.devices.push(...devices);
    }.bind(this));

    this.socket.on('device.connect', function (device) {
      this.devices.push({ id: device.id });
    }.bind(this));

    this.socket.on('device.disconnect', function (device) {
      removeDevice(this.devices, device);
    }.bind(this));
  },
});

function removeDevice(devices, device) {
  let index = devices.findIndex(x => x.id === device.id);
  if (index !== -1) {
    devices.splice(index, 1);
  }
}
