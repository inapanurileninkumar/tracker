export default {
  SET_EMIS (state, emis) {
    state.emis = emis
  },
  ADD_EMI (state, emi) {
    state.emis.push(emi)
  },
  REMOVE_EMI (state, emi) {
    state.emis = state.emis.filter(em => em.id !== emi)
  }
}
