const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()

export default {
  currentMonth: new Date(year, month, 1).getTime(),
  accountBalance: 34000,
  additionalIncome: [
    {
      month: new Date(2024, 9, 1),
      name: 'SEVARANCE',
      amount: 125000
    },
    {
      month: new Date(2024, 9, 1),
      name: 'NEW COMPANY SALARY',
      amount: 75000
    }
  ],
  monthlySalaries: [
    {
      month: new Date(2024, 8, 1),
      salary: 125000
    },
    {
      month: new Date(2024, 9, 1),
      salary: 125000
    },
    {
      month: new Date(2024, 10, 1),
      salary: 140000
    },
    {
      month: new Date(2024, 11, 1),
      salary: 140000
    },
    {
      month: new Date(2025, 0, 1),
      salary: 140000
    },
    {
      month: new Date(2025, 1, 1),
      salary: 140000
    },
    {
      month: new Date(2025, 2, 1),
      salary: 140000
    },
    {
      month: new Date(2025, 3, 1),
      salary: 140000
    }
  ]
}
