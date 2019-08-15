/*
  - Calibration is done the device once, so that all devices display the content
  with the same physical dimensions.
*/

import { getDeviceId, } from './utils.js';

function onScaleDiff(diff, device, socket) {
  device.scaleMultiplier += diff;
  socket.emit('device.update', getDeviceId(), device);
}

Vue.component('scale-setter', {
  props: [
    'device',
    'socket',
  ],
  methods: {
    onScalePlus() {
      onScaleDiff(1, this.device, this.socket);
    },
    onScaleMinus() {
      onScaleDiff(-1, this.device, this.socket);
    },
  },
  template: '#scale-setter',
});
