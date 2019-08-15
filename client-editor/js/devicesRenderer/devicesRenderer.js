import { factoryDeviceGraphic, } from './factories.js';
import { consts, } from '/common/consts.mjs';

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
  template: '#devices-renderer',
});

function draw(app, x, y, width, height) {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(2, 0x7f1576, 1);
  graphics.beginFill(0x000000, 0.2);
  graphics.drawRect(0, 0, width, height);
  graphics.endFill();

  graphics.interactive = true;
  graphics.buttonMode = true;

  graphics.alpha = 0.9;

  graphics.x = x;
  graphics.y = y;

  app.stage.addChild(graphics);
  return graphics;
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
