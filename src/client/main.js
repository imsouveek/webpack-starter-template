require('./main.css');
require('./index.pug');

console.log(process.env.NODE_ENV);
import Vue from 'vue';
import App from "./App.vue";

new Vue({
  render: h => h(App)
}).$mount("#root");
