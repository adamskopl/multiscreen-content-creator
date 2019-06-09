const app = new Vue({
  el: '#app',
  data: {
    id: null,
  },
  created() {
    this.socket = io();

    this.socket.on('connect', function () {
      console.warn('CONNECTED');
      this.id = this.socket.id;
    }.bind(this));

    this.socket.emit('dimensions', {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  },
});
