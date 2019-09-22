export const templateDeviceImage = `
<div
  v-drag-events
  @drag-start="onDragStart"
  @drag-move="onDragMove"
  class="device-drag"
  :style="getStyle()"
  ></div>
`;
