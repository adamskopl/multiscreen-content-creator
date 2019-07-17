/*
  - Calibration is done the device once, so that all devices display the content
  with the same physical dimensions.
*/

const scaleStep = 0.03;

Vue.component('scale-setter', {
  data() {
    return {

    };
  },
  props: [
    'device',
  ],
  methods: {
    onScalePlus() {
      this.device.scale += scaleStep;
    },
    onScaleMinus() {
      this.device.scale -= scaleStep;
    },
  },
  template: '#scale-setter',
});
