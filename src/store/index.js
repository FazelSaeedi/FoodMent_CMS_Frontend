import Vue from 'vue'
import Vuex from 'vuex'
import UserModul from './UserModul.js'
import GlobalModul from "@/store/GlobalModul";
import TypeModul from "@/store/TypeModul";
import MainGroupModul from "@/store/MainGroupModul";
import SubGroupModul from "@/store/SubGroupModul";
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
    GlobalModul,
    TypeModul,
    MainGroupModul,
    SubGroupModul,
  }
})
