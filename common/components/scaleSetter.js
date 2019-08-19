/*
  - Calibration is done the device once, so that all devices display the content
  with the same physical dimensions.
*/

import { templateScaleSetter, } from '../templates.template.js';

function onScaleDiff(diff, device, socket, emitter) {
  device.scaleMultiplier += diff;
  socket.emit('device.update', device);
  emitter.$emit('device-update', device);
}

Vue.component('scale-setter', {
  props: [
    'device',
    'socket',
  ],
  methods: {
    onScalePlus() {
      onScaleDiff(1, this.device, this.socket, this);
    },
    onScaleMinus() {
      onScaleDiff(-1, this.device, this.socket, this);
    },
  },
  template: templateScaleSetter,
});
