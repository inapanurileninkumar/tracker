import { getUUID } from '@/utils'

export default {
  addEmi ({ commit }, { name, amount, startDate, endDate }) {
    startDate = new Date(startDate)
    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)
    endDate = new Date(endDate)
    endDate.setDate(1)
    endDate.setHours(0, 0, 0, 0)
    commit('ADD_EMI', {
      name: name.toUpperCase(),
      amount,
      id: getUUID(),
      startDate: startDate.getTime(),
      endDate: endDate.getTime()
    })
  }
}
