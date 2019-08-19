export const templateScaleSetter = `
<div class="scale-setter">
  <h1>{{device.scaleMultiplier}}</h1>
  <button @click="onScalePlus" class="scale-setter__button">
    SCALE +
  </button>
  <button @click="onScaleMinus" class="scale-setter__button">
    SCALE -
  </button>
</div>
`;
