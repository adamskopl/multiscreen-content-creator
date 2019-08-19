const lineWidth = 2;

export function drawDeviceNormal(
  graphic,
  width = graphic.width,
  height = graphic.height,
) {
  graphic.clear();
  graphic.lineStyle(lineWidth, 0x7f1576, 1);
  graphic.beginFill(0x000000, 0.2);
  graphic.drawRect(0, 0, width - lineWidth, height - lineWidth);
  graphic.endFill();
}

export function drawDeviceSelected(
  graphic,
  width = graphic.width,
  height = graphic.height,
) {
  graphic.clear();
  graphic.lineStyle(lineWidth, 0x7f1576, 1);
  graphic.beginFill(0x00FF00, 0.2);
  graphic.drawRect(0, 0, width - lineWidth, height - lineWidth);
  graphic.endFill();
}
