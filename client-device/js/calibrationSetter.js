/*
  - Calibration is done the device once, so that all devices display the content
  with the same physical dimensions.
*/

const scaleStep = 0.03;

Vue.component('calibration-setter', {
  data() {
    return {

    };
  },
  props: [
    'appContentStyleProps',
  ],
  methods: {
    onCalibrationPlus() {
      this.appContentStyleProps.scale += scaleStep;
    },
    onCalibrationMinus() {
      this.appContentStyleProps.scale -= scaleStep;
    },
  },
  template: '#calibration-setter',
});
