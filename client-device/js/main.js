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
    device: {},
    socket: null,
    content: {},
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
      this.socket.emit('device.login', getDeviceId(),
        onDeviceFetched.bind(null, this));
    });

    this.socket.on('content.update', (content) => {
      this.content = content;
    });

    this.socket.on('device.update', (device) => {
      this.device = device;
    });

    window.addEventListener('resize', onWindowResize.bind(null, this));
  },
});

function onWindowResize(data) {
  data.device.clientWidth = document.documentElement.clientWidth;
  data.device.clientHeight = document.documentElement.clientHeight;
  data.socket.emit('device.update', data.device);
}

function onDeviceFetched(data, device) {
  data.device = device;
  data.device.clientWidth = document.documentElement.clientWidth;
  data.device.clientHeight = document.documentElement.clientHeight;

  data.socket.emit('device.update', data.device);

  data.socket.emit('content.get', (content) => {
    data.content = content;
  });
}
