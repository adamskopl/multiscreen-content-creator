import { getDeviceId, } from './utils.js';
import { debounce, } from '/common/utils.mjs';
import { consts, } from '/common/consts.mjs';
import {} from '/common/components/scaleSetter.js';

const scaleSetterVisiblityDebounce = 5000;

const hideScaleSetterDebounce = debounce(function hideScaleSetter(app) {
  app.scaleSetterVisible = false;
}, scaleSetterVisiblityDebounce);

const app = new Vue({
  el: '#app',
  data: {
    device: { // object synchronized with the server
      x: 0,
      y: 0,
      scaleMultiplier: 0,
    },
    socket: null,
    content: { // object synchronized with the server
      html: '',
    },
    scaleSetterVisible: false,
  },
  computed: {
    contentStyle() {
      const scale = 1 + (this.device.scaleMultiplier * consts.scale);
      return {
        transform: `
          scale(${scale})
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

        this.device.clientWidth = document.documentElement.clientWidth;
        this.device.clientHeight = document.documentElement.clientHeight;
        this.socket.emit('device.update', this.device);

        this.socket.emit('content.get', (content) => {
          Object.assign(this.content, content);
        });
      });
    });

    this.socket.on('content.update', (content) => {
      Object.assign(this.content, content);
    });

    this.socket.on('device.update', (device) => {
      this.device = device;
    });

    window.addEventListener('resize', () => {
      this.device.clientWidth = document.documentElement.clientWidth;
      this.device.clientHeight = document.documentElement.clientHeight;
      this.socket.emit('device.update', this.device);
    });
  },
});
