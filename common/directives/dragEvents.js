import { dispatchDirectiveEvent, } from '../utils.mjs';

/*
  <div
  v-drag-emit
  @drag-start="onDragStart"
  @drag-end="onDragEnd"
  @drag-move="onDragMove"
  ></div>

  onDragMove(dragData) {
    // dragData.detail.offsetX, dragData.detail.offsetY;
  },
  */
Vue.directive('drag-events', {
  inserted(el, binding, vnode) {
    let lastPos = { x: null, y: null, };

    function onMouseUp() {
      dispatchDirectiveEvent({ name: 'drag-end', el, vnode, });
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMove);
    }

    function onTouchEnd() {
      dispatchDirectiveEvent({ name: 'drag-end', el, vnode, });
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchmove', onTouchMove);
    }

    function onMove(e) {
      dispatchDirectiveEvent({
        name: 'drag-move',
        arg: {
          offsetX: e.clientX - lastPos.x,
          offsetY: e.clientY - lastPos.y,
        },
        el,
        vnode,
      });
      lastPos.x = e.clientX;
      lastPos.y = e.clientY;
    }

    function onTouchMove(e) {
      onMove(e.touches[0]);
    }

    el.addEventListener('touchstart', (e) => {
      e.preventDefault(); // prevent mouse events
      lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY, };
      dispatchDirectiveEvent({ name: 'drag-start', el, vnode, });
      document.addEventListener('touchend', onTouchEnd);
      document.addEventListener('touchmove', onTouchMove);
    });

    el.addEventListener('mousedown', (e) => {
      lastPos = { x: e.clientX, y: e.clientY, };
      dispatchDirectiveEvent({ name: 'drag-start', el, vnode, });
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMove);
    });
  },
});
