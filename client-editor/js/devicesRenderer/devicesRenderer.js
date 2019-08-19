import { factoryDeviceGraphic, } from './factories.js';
import { consts, } from '/common/consts.mjs';
import { drawDeviceNormal, drawDeviceSelected, } from './graphicsDrawing.js';

const contentWidth = 1920;
const contentHeight = 1080;

Vue.component('devices-renderer', {
  data() {
    return {
      pixiApp: null,
      // @key {string} Device.id value
      // @value {DeviceGraphic}
      graphics: new Map(),
    };
  },
  methods: {
    drawDevice(device) {
      const scale = (1 + device.scaleMultiplier * consts.scale);
      const graphW = device.clientWidth / scale;
      const graphH = device.clientHeight / scale;
      const deviceGraphic = factoryDeviceGraphic.create({
        deviceId: device.id,
        graphic: draw(
          this.pixiApp,
          device.x,
          device.y,
          graphW,
          graphH,
        ),
      });
      deviceGraphic.graphic
        .on('pointerdown', onPointerDown.bind(this, deviceGraphic))
        .on('pointerup', onPointerUp.bind(this, deviceGraphic))
        .on('pointerupoutside', onPointerUp.bind(this, deviceGraphic))
        .on('pointermove', onPointerMove.bind(this, deviceGraphic));

      this.graphics.set(
        device.id,
        deviceGraphic,
      );
    },
    destroyDevice(deviceId) {
      if (this.graphics.get(deviceId) === undefined) { return; }
      this.graphics.get(deviceId).graphic.destroy();
      this.graphics.delete(deviceId);
    },
    unhighlightDevices() {
      this.graphics.forEach((gd) => { drawDeviceNormal(gd.graphic); });
    },
    highlightDevice(deviceId) {
      drawDeviceSelected(this.graphics.get(deviceId).graphic);
    },
  },
  mounted() {
    this.pixiApp = new PIXI.Application({
      width: contentWidth,
      height: contentHeight,
      transparent: true,
      antialias: true,
    });
    this.$el.appendChild(this.pixiApp.view);
  },
  template: '<div></div>',
});

function draw(app, x, y, width, height) {
  const graphic = new PIXI.Graphics();
  drawDeviceNormal(graphic, width, height);

  graphic.interactive = true;
  graphic.buttonMode = true;

  graphic.x = x;
  graphic.y = y;

  app.stage.addChild(graphic);
  return graphic;
}

function onPointerDown(deviceGraphic, event) {
  deviceGraphic.graphic.alpha = 0.5;
  deviceGraphic.dragData.dragging = true;

  const clickPoint = event.data
    .getLocalPosition(deviceGraphic.graphic.parent);
  deviceGraphic.dragData.clickDistance.x = deviceGraphic.graphic.x
    - clickPoint.x;
  deviceGraphic.dragData.clickDistance.y = deviceGraphic.graphic.y
    - clickPoint.y;

  this.$emit('device-click', {
    id: deviceGraphic.deviceId,
  });
}

function onPointerUp(deviceGraphic) {
  deviceGraphic.graphic.alpha = 1;
  deviceGraphic.dragData.dragging = false;
}

function onPointerMove(deviceGraphic, event) {
  if (deviceGraphic.dragData.dragging) {
    const pointerPos = event.data
      .getLocalPosition(deviceGraphic.graphic.parent);
    const newGraphicX = pointerPos.x
      + deviceGraphic.dragData.clickDistance.x;
    const newGraphicY = pointerPos.y
      + deviceGraphic.dragData.clickDistance.y;

    deviceGraphic.graphic.x = newGraphicX;
    deviceGraphic.graphic.y = newGraphicY;

    this.$emit('device-position-change', {
      id: deviceGraphic.deviceId,
      x: newGraphicX,
      y: newGraphicY,
    });
  }
}
