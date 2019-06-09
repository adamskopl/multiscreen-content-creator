const app = new Vue({
  el: '#app',
  data: {
    id: null,
    src: 'assets/test.jpg',
    contentHtml: ''
  },
  created() {
    this.socket = io();

    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });

    this.socket.on('test-html', (html) => {
      this.contentHtml = html;
    });

    this.socket.emit('dimensions', {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  },
});
