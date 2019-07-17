import { debounce, } from './utils.js';
import {} from './scaleSetter.js';

const scaleSetterVisiblityDebounce = 5000;

function getDeviceId() {
  // http://localhost:3000/devices/01aa6930/
  return window.location.pathname.split('/')[2];
}

const hideScaleSetterDebounce = debounce(function hideScaleSetter(app) {
  app.scaleSetterVisible = false;
}, scaleSetterVisiblityDebounce);

const app = new Vue({
  el: '#app',
  data: {
    device: { // object synchronized with the server
      x: 0,
      y: 0,
      scale: 1.0,
    },
    content: { // object synchronized with the server
      html: '',
    },
    scaleSetterVisible: false,
  },
  computed: {
    contentStyle() {
      return {
        transform: `
          scale(${this.device.scale})
          translateX(${-this.device.x}px)
          translateY(${-this.device.y}px)
        `,
      };
    },
  },
  methods: {
    onAppClick() {
      this.scaleSetterVisible = true;
      hideScaleSetterDebounce(this);
    },
  },
  mounted() {
    this.socket = io('/devices');

    this.socket.on('connect', () => {
      this.socket.emit('device.login', getDeviceId(), (device) => {
        Object.assign(this.device, device);
        this.device.x = 100;
        this.device.width = document.documentElement.clientWidth;
        this.device.height = document.documentElement.clientHeight;
        this.socket.emit('device.update', getDeviceId(), this.device);
        this.socket.emit('content.get', (content) => {
          Object.assign(this.content, content);
        });
      });
    });

    this.socket.on('content.update', (content) => {
      Object.assign(this.content, content);
    });

    this.socket.on('device.update', (device) => {
      Object.assign(this.device, device);
    });

    window.addEventListener('resize', () => {
      Object.assign(this.device, {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
      this.socket.emit('device.update', getDeviceId(), this.device);
    });
  },
});
