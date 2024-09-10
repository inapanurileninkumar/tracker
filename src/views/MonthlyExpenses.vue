<template>
  <div class="row">
    <table class="emis">
      <thead>
        <tr>
          <th>MONTH</th>
          <th>INCOME</th>
          <th>EXPENSES</th>
          <th>BALANCE</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(month, index) in monthlyExpenses">
          <tr :key="index" :class="{ 'active': month.month === currentMonth }">
            <td>{{ month.month | formatDate }}</td>
            <td>{{ month.income | formatNumber }}</td>
            <td>{{ month.expense | formatNumber }}</td>
            <td>{{ month.balance | formatNumber }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppSettlements',
  data () {
    return {
      monthlyExpenses: []
    }
  },
  computed: {
    ...mapGetters('configuration', ['monthlySalaries', 'currentMonth', 'additionalIncome']),
    ...mapGetters('emis', ['emis']),
    ...mapGetters('settlements', ['settlements'])
  },
  watch: {
    currentMonth () { this.calculateMonthlyExpenses() },
    emis () { this.calculateMonthlyExpenses() },
    settlements () { this.calculateMonthlyExpenses() }
  },
  mounted () {
    this.calculateMonthlyExpenses()
  },
  methods: {
    calculateMonthlyExpenses () {
      const monthlyExpenses = []
      const startMonth = new Date()
      startMonth.setDate(1)
      const endMonth = new Date(2025, 4, 1)
      while (startMonth.getTime() <= endMonth.getTime()) {
        const month = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1).getTime()
        const expense = this.getMonthExpenses(month)
        const income = (this.monthlySalaries.find(salary => salary.month === month)?.salary || 0) + this.getMonthIncome(month)
        monthlyExpenses.push({
          month,
          income,
          expense,
          balance: (monthlyExpenses.length ? (monthlyExpenses[monthlyExpenses.length - 1].balance) : 0) + income - expense
        })
        startMonth.setMonth(startMonth.getMonth() + 1)
      }
      this.monthlyExpenses = monthlyExpenses
    },
    getMonthExpenses (month) {
      return [
        ...this.emis.filter(emi => emi.startDate <= month && emi.endDate >= month),
        ...this.settlements.filter(settlement => settlement.month === month)
      ].reduce((total, expense) => total + Number(expense.amount), 0)
    },
    getMonthIncome (month) {
      return this.additionalIncome.filter(incomeSource => incomeSource.month === month).reduce((total, income) => total + Number(income.amount), 0)
    }
  }
}
</script>
