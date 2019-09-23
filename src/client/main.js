require('webpack-hot-middleware/client?reload=true');
require('./main.css');
require('./index.pug');

import Vue from 'vue';
import App from "./App.vue";

new Vue({
  render: h => h(App)
}).$mount("#root");
