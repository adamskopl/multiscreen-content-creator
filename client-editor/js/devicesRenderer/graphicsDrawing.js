export function drawDeviceNormal(
  graphic,
  width = graphic.width,
  height = graphic.height,
) {
  graphic.clear();
  graphic.lineStyle(2, 0x7f1576, 1);
  graphic.beginFill(0x000000, 0.2);
  graphic.drawRect(0, 0, width, height);
  graphic.endFill();
}

export function drawDeviceSelected(
  graphic,
  width = graphic.width,
  height = graphic.height,
) {
  graphic.clear();
  graphic.lineStyle(2, 0x7f1576, 1);
  graphic.beginFill(0xFF0000, 0.2);
  graphic.drawRect(0, 0, width, height);
  graphic.endFill();
}
