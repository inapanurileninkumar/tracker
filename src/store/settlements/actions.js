import { getUUID } from '@/utils'

export default {
  addSettlement ({ commit }, { name, amount, month }) {
    month = new Date(month)
    month.setDate(1)
    month.setHours(0, 0, 0, 0)
    commit('ADD_SETTLEMENT', {
      id: getUUID(),
      name,
      amount,
      month: month.getTime()
    })
  }
}
