import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

import routes from './router/index'
const router = new VueRouter({routes, mode: 'history'});
Vue.use(VueRouter);

import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    IP: 0,
    theme: 'light'
  },
  mutations: {
    init(state) {
      fetch('https://api.ipify.org?format=json')
      .then(x => x.json())
      .then(({ ip }) => {
          state.IP = ip;
          console.log(state.IP + ' ' + ip);
      });
    },
    set(state, ip){
      state.IP = ip;
    },
    changeMode(state){
      if(state.theme == 'light'){
        GeistUI.theme.enableDark();
        state.theme = 'dark';
      } else if(state.theme == 'dark'){
        GeistUI.theme.enableLight();
        state.theme = 'light';
      }
    }
  },
  getters: {
    getIP: state => {
      return state.IP
    }
  }
})

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
})

import GeistUI from '@geist-ui/vue'
import '@geist-ui/vue/dist/geist-ui.css'
import './global.css'

import {install} from '@geist-ui/vue-icons'
install(Vue);
Vue.use(GeistUI)

import { uniMapMarker, uniBrightness } from 'vue-unicons/src/icons'

import Unicon from 'vue-unicons'
Unicon.add([uniMapMarker, uniBrightness])
Vue.use(Unicon)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import vueHeadful from 'vue-headful'
Vue.component('vue-headful', vueHeadful);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
