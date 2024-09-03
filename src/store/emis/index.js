import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  emis: []
}
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
