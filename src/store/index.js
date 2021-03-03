import Vue from 'vue'
import Vuex from 'vuex'
import UserModul from './UserModul.js'
import GlobalModul from "@/store/GlobalModul";
Vue.use(Vuex)




export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    UserModul ,
    GlobalModul
  }
})
