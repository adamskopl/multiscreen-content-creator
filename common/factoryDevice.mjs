import { factoryTemplate, } from './factoryTemplate.mjs';

/**
 * - Device keeps data which can be restored from the server either by 'device'
 *   client or 'editor' client.
 * - Data such as displayed content is not kept, because it's shared among all
 *   the devices and is provided by an 'editor' client.
 * @typedef {Object} Device
 */

const required = true;
const definingObject = {
  id: { required, },
  socketId: {}, // one socket for each device
  x: { default: 0, }, // device's x, y related to the content
  y: { default: 0, },
  clientWidth: { default: 0, }, // device's dimension
  clientHeight: { default: 0, },
  // used for i.a. devices physical size synchronization. It's a multiplier, not
  // a scale value, so that float value is not stored.
  scaleMultiplier: { default: 0, },
};

export const factoryDevice = {
  create(initObject) {
    return factoryTemplate(definingObject, initObject);
  },
};
