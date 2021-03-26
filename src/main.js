import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io('https://api.connectr.xyz');

Vue.config.productionTip = false

Vue.use(VueSocketIOExt, socket)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
