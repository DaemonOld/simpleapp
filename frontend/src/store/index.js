import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import objects from './objects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, objects
  }
})
