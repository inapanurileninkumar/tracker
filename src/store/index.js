import Vue from 'vue'
import Vuex from 'vuex'
import emis from './emis'
import settlements from './settlements'
import configuration from './configuration'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    emis,
    settlements,
    configuration
  }
})
