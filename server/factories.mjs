export const factoryDevice = {
  create({
    id = null,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
  }) {
    return {
      id,
      x,
      y,
      width,
      height,
    };
  },
};
