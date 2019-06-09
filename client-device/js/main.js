const app = new Vue({
  el: '#app',
  data: {
    id: null,
    src: null
  },
  created() {
    this.socket = io();

    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });

    this.socket.on('test-add', (src) => {
      console.warn(src);
      this.src = src;
    });

    this.socket.emit('dimensions', {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  },
});
