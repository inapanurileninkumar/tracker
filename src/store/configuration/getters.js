export default {
  currentMonth: state => state.currentMonth,
  additionalIncome: state => state.additionalIncome,
  monthlySalaries: state => state.monthlySalaries,
  accountBalance: state => state.accountBalance,
  currentMonthSalary: state => (
    (state.monthlySalaries.find(salary => salary.month === state.currentMonth)?.salary || 0)
  ) + (state.additionalIncome.filter(income => income.month === state.currentMonth).reduce((total, income) => total + Number(income.amount), 0))
}
