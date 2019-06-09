const app = new Vue({
  el: '#app',
  data: {
    devices: [],
  },
  methods: {
    onClick() {
      this.socket.emit('press');
    },
  },
  created() {
    this.socket = io();
    this.socket.on('device.connect', function (device) {
      this.devices.push({ id: device.id });
    }.bind(this));

    this.socket.on('device.disconnect', function (device) {
      let index = this.devices.findIndex(x => x.id === device.id);
      if (index !== -1) {
        console.warn(`removing ${index}`);
        this.devices.splice(index, 1);
      }
    }.bind(this));
  },
});
