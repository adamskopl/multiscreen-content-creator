import { arrayIsSubset, } from './utils.mjs';

/**
 * - Device keeps data which can be restored from the server either by 'device'
 *   client or 'editor' client.
 * - Data such as displayed content is not kept, because it's shared among all
 *   the devices and is provided by an 'editor' client.
 * @typedef {Object} Device
 */

const deviceProperties = [
  'id',
  'socketId', // assumption: only one socket for each device
  'x', // device's x, y related to the content
  'y',
  'clientWidth', // device's dimension
  'clientHeight',
  // used for i.a. devices physical size synchronization. It's a multiplier, not
  // a scale value, so that float value is not stored.
  'scaleMultiplier',
];

export const factoryDevice = {
  create(initProperties) {
    if (!arrayIsSubset(deviceProperties, Object.keys(initProperties))) {
      console.error(`wrong properties: ${initProperties}`);
    }
    return initProperties;
  },
};
