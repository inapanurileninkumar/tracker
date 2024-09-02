export default {
  setCurrentMonth ({ commit }, selectedDate) {
    let date = new Date(selectedDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    date = new Date(year, month, 1)
    commit('SET_CURRENT_MONTH', date.getTime())
  }
}
