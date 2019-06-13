const app = new Vue({
  el: '#app',
  data: {
    id: null,
    contentHtml: '',
    clientWidth: null,
    clientHeight: null,

    contentStyleProps: {
      scale: 1.0,
      translateX: 0,
      translateY: 0,
    },
  },
  computed: {
    contentStyle() {
      return {
        transform: `
          scale(${this.contentStyleProps.scale})
          translateX(${this.contentStyleProps.translateX}px)
          translateY(${this.contentStyleProps.translateY}px)
        `,
      };
    },
  },
  methods: {
    onWindowResize() {
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
    onDeviceTransform(transformData) {
      this.contentStyleProps.translateX = -transformData.translateX;
      this.contentStyleProps.translateY = -transformData.translateY;
    },
  },
  created() {
    this.socket = io();

    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });

    this.socket.on('device.relogin', this.login.bind(this));

    this.socket.on('device.transform', this.onDeviceTransform.bind(this));

    this.socket.on('test-html', (html) => {
      this.contentHtml = html;
    });
  },
  mounted() {
    this.devicePixelRatio = window.devicePixelRatio;

    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  },
});
