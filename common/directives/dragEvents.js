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
    let clientPosStart = { x: null, y: null, };

    function onMouseUp() {
      dispatchDirectiveEvent({ name: 'drag-end', el, vnode, });
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

    function onTouchEnd() {
      dispatchDirectiveEvent({ name: 'drag-end', el, vnode, });
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchmove', onTouchMove);
    }

    function onMouseMove(e) {
      dispatchDirectiveEvent({
        name: 'drag-move',
        arg: {
          offsetX: e.clientX - clientPosStart.x,
          offsetY: e.clientY - clientPosStart.y,
        },
        el,
        vnode,
      });
    }

    function onTouchMove(e) {
      dispatchDirectiveEvent({
        name: 'drag-move',
        arg: {
          offsetX: e.touches[0].clientX - clientPosStart.x,
          offsetY: e.touches[0].clientY - clientPosStart.y,
        },
        el,
        vnode,
      });
    }

    el.addEventListener('touchstart', (e) => {
      e.preventDefault(); // prevent mouse events
      clientPosStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, };
      dispatchDirectiveEvent({ name: 'drag-start', el, vnode, });
      document.addEventListener('touchend', onTouchEnd);
      document.addEventListener('touchmove', onTouchMove);
    });

    el.addEventListener('mousedown', (e) => {
      clientPosStart = { x: e.clientX, y: e.clientY, };
      dispatchDirectiveEvent({ name: 'drag-start', el, vnode, });
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    });
  },
});
