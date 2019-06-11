const app = new Vue({
  el: '#app',
  data: {
    devices: [],
    clientWidth: null,
    clientHeight: null,
    testImgSrc: 'assets/test-grid.jpg',
  },
  methods: {
    onDeviceClick(id) {
      const editorAreaElement = document.querySelector('.editor-area');
      this.socket.emit('test-html', {
        id,
        html: editorAreaElement.innerHTML
      });
    },
    onResize() {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
    },
  },
  created() {
    this.socket = io();

    // subscriptions
    this.socket.on('device.login', (device) => {
      this.devices.push(device);
      console.warn(`${device.id} ${device.width}x${device.height}`);

      this.onDeviceClick(device.id);
    });
    this.socket.on('device.disconnect', (device) => {
      removeDevice(this.devices, device);
    });

    // init
    this.socket.emit('device.list', (devices) => {
      devices.forEach((device) => {
        console.warn(`${device.id} ${device.width}x${device.height}`);
      });
      this.devices.push(...devices);
    });
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
});

function removeDevice(devices, device) {
  let index = devices.findIndex(x => x.id === device.id);
  if (index !== -1) {
    devices.splice(index, 1);
  }
}
