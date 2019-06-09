const app = new Vue({
  el: '#app',
  data: {
    devices: [],
  },
  methods: {
    onClick(id) {
      console.warn(id)
      this.socket.emit('editor-test', id);
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
