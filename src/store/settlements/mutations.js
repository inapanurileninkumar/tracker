export default {
  SET_SETTLEMENTS (state, settlements) {
    state.settlements = settlements
  },
  ADD_SETTLEMENT (state, settlement) {
    state.settlements.push(settlement)
  },
  REMOVE_SETTLEMENT (state, settlement) {
    state.settlements = state.settlements.filter(s => s.id !== settlement.id)
  }
}
