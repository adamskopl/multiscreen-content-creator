const app = new Vue({
  el: '#app',
  data: {
    id: null,
    devicePixelRatio: null,
    contentHtml: '',
    clientWidth: null,
    clientHeight: null,
  },
  methods: {
    onResize() {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      this.login();
    },
    login() {
      this.socket.emit('login', {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    },
  },
  created() {
    this.socket = io();

    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });

    this.socket.on('device.relogin', this.login.bind(this));

    this.socket.on('test-html', (html) => {
      this.contentHtml = html;
    });
  },
  mounted() {
    this.devicePixelRatio = window.devicePixelRatio;

    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
});
