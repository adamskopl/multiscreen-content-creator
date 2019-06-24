/**
 * @typedef {Object} Device
 */

export const factoryDevice = {
  create({
    id = null,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    // assumption: only one socket for each device
    socketId = null,
  }) {
    return {
      id,
      x,
      y,
      width,
      height,
      socketId,
    };
  },
};
