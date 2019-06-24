const app = new Vue({
  el: '#app',
  data: {
    contentHtml: '',
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
    login() {
      this.socket.emit('device.login', {
        id: getDeviceId(),
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    },
    onDeviceContentChange(contentData) {
      this.contentHtml = contentData.html
        || this.contentHtml;
      this.contentStyleProps.translateX = -contentData.transformData.x
        || this.contentStyleProps.translateX;
      this.contentStyleProps.translateY = -contentData.transformData.y
        || this.contentStyleProps.translateY;
    },
  },
  mounted() {
    this.socket = io('/devices');

    this.socket.on('connect', () => {
      this.login();
    });

    this.socket.on('device.relogin', this.login.bind(this));
    this.socket.on('device.content-change',
      this.onDeviceContentChange.bind(this));

    window.addEventListener('resize', this.login.bind(this));
  },
});

function getDeviceId() {
  // http://localhost:3000/devices/01aa6930/
  return window.location.pathname.split('/')[2];
}
