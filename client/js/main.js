const app = new Vue({
  el: '#app',
  data: {
    dupa: 'ale dupa',
  },
  created() {
    this.socket = io('');
    console.warn(document.documentElement.clientWidth);
    console.warn(document.documentElement.clientHeight);
  },
});
