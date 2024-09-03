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
      amount: 0
    },
    {
      month: new Date(2024, 10, 1),
      name: 'CROP LOAN SELF',
      amount: 75000
    },
    {
      month: new Date(2024, 10, 1),
      name: 'CROP LOAN MRLPD',
      amount: 60000
      // 1,00,000 + 50,000 + 10,000-> 1,60,000 - 60,000 -> Lend 1,00,000 to MRLPD
      //
      // 130000 MRLPD NEW CROP LOAN. Take above 60,000 from this 1,30,000
      // 1,30,000 - 60,000 -> 70,000
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
      salary: 125000
    },
    {
      month: new Date(2024, 11, 1),
      salary: 125000
    },
    {
      month: new Date(2025, 0, 1),
      salary: 125000
    },
    {
      month: new Date(2025, 1, 1),
      salary: 125000
    },
    {
      month: new Date(2025, 2, 1),
      salary: 125000
    },
    {
      month: new Date(2025, 3, 1),
      salary: 125000
    }
  ]
}
