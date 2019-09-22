import { templateDeviceImage, } from './templates.template.js';
import { consts, } from '/common/consts.mjs';
import { store, } from '../store.js';

Vue.component('deviceImage', {
  props: [
    'device',
    'selected',
  ],
  methods: {
    onDragStart() {
      this.$emit('device-click', this.device);
    },
    onDragMove(e) {
      store.devices.modify(this.device, {
        x: this.device.x + e.detail.offsetX,
        y: this.device.y + e.detail.offsetY,
      });
    },
    getStyle() {
      const scale = 1 + (this.device.scaleMultiplier * consts.scale);
      return {
        left: `${this.device.x}px`,
        top: `${this.device.y}px`,
        width: `${this.device.clientWidth / scale}px`,
        height: `${this.device.clientHeight / scale}px`,
        backgroundColor: this.selected ? 'rgba(0, 100, 0, 0.2)' : 'unset'
      };
    },
  },
  template: templateDeviceImage,
});
