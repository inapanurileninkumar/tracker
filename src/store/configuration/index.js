import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  currentMonth: undefined,
  additionalIncome: [],
  monthlySalaries: [],
  accountBalance: 0
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
