/**
 * @typedef {Object} DeviceGraphic
 */

export const factoryDeviceGraphic = {
  create({
    deviceId = null,
    graphic = null,
  }) {
    return {
      deviceId,
      graphic,
      dragData: {
        dragging: false,
        clickDistance: { x: 0, y: 0, },
      },
    };
  },
};
