<template>
  <div class="row expenses-container">
    <div class="card col-md-4 col-sm-12 col-xs-12">
      <div class="header">
        <div class="title">EXPENSES</div>
      </div>
      <div class="body">
        <table class="expenses">
          <thead>
            <tr>
              <th>SN</th>
              <th>NAME</th>
              <th>AMOUNT</th>
              <th>PAID</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(expense, index) in currentMonthExpenses">
              <tr :key="expense.name" @click="handleExpensePaid(expense)" class="pointer-cursor">
                <td>{{ index + 1 }}</td>
                <td>{{ expense.name }}</td>
                <td class="right-align">{{ expense.amount | formatNumber }}</td>
                <td class="checkbox">
                  <div class="checkbox-container" :class="{ 'checked': expense.paid }">
                    <div class="checkmark" v-if="expense.paid"></div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card col-md-5 col-sm-12 col-xs-12">
      <div class="body">
        <div class="flex justify-center align-center">
          <v-chart class="expenses-chart" :option="chartData" autoresize />
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-12 col-xs-12">
      <div class="card mb-4 bg-primary text-white">
        <div class="body">
          <div><span class="label">TOTAL</span></div>
          <div><span class="value">{{ totalExpenses | formatNumber }}</span></div>
        </div>
      </div>
      <div class="card mb-4">
        <div class="body">
          <div><span class="label">ACCOUNT BALANCE</span></div>
          <div><span class="value">{{ accountBalance | formatNumber }}</span></div>
        </div>
      </div>
      <div class="card mb-4 bg-success text-white">
        <div class="body">
          <div><span class="label">PAID</span></div>
          <div><span class="value">{{ paidAmount | formatNumber }}</span></div>
        </div>
      </div>
      <div class="card mb-4 bg-warning text-white">
        <div class="body">
          <div><span class="label">REMAINING</span></div>
          <div><span class="value">{{ unpaidAmount | formatNumber }}</span></div>
        </div>
      </div>
      <div class="card mb-4 bg-danger text-white" v-if="accountBalance < unpaidAmount">
        <div class="body">
          <div><span class="label">BORROW</span></div>
          <div><span class="value">{{ unpaidAmount - accountBalance | formatNumber }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatNumber } from '../mixins/format'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
// import { ref, defineComponent } from 'vue'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default {
  name: 'AppExpenses',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  data () {
    return {
      currentMonthExpenses: []
      // accountBalance: 0
    }
  },
  computed: {
    ...mapGetters('settlements', ['settlements']),
    ...mapGetters('emis', ['emis']),
    ...mapGetters('configuration', ['currentMonth', 'currentMonthSalary', 'accountBalance']),
    currentMonthEmis: function () {
      return this.emis.filter(emi => emi.startDate <= this.currentMonth && emi.endDate >= this.currentMonth)
    },
    currentMonthSettlements: function () {
      return this.settlements.filter(settlement => settlement.month === this.currentMonth)
    },
    totalExpenses: function () {
      return this.currentMonthExpenses.reduce((total, expense) => total + Number(expense.amount), 0)
    },
    paidAmount: function () {
      return this.currentMonthExpenses.filter(expense => expense.paid).reduce((total, expense) => total + Number(expense.amount), 0)
    },
    unpaidAmount: function () {
      return this.currentMonthExpenses.filter(expense => !expense.paid).reduce((total, expense) => total + Number(expense.amount), 0)
    },
    chartData: function () {
      return {
        tooltip: {
          trigger: 'item'
          // formatter: function (params) { return params.name + ' : ' + formatNumber(params.value) }
        },
        legend: {
          show: true
        },
        series: [
          {
            name: 'Expenses',
            type: 'pie',
            radius: '60%',
            center: ['50%', '55%'],
            data: [
              { value: this.paidAmount, name: 'Paid' },
              { value: this.unpaidAmount, name: 'Remaining' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // position: 'inner',
                  formatter: function (params) {
                    return formatNumber(params.value)
                  },
                  fontSize: 15,
                  fontWeight: 'bold'
                },
                labelLine: {
                  // show: false
                }
              }
            }
          }
        ]
      }
    },
    chartOptions: function () {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch: {
    currentMonth () { this.buildCurrentMonthExpenses() },
    emis () { this.buildCurrentMonthExpenses() },
    settlements () { this.buildCurrentMonthExpenses() },
    currentMonthSalary () { this.resetAccountBalance() }
  },
  mounted () {
    this.buildCurrentMonthExpenses()
    this.resetAccountBalance()
  },
  methods: {
    resetAccountBalance () {
      // this.accountBalance = this.currentMonthSalary
    },
    buildCurrentMonthExpenses () {
      const currentMonthEMIs = this.emis.filter(emi => emi.startDate <= this.currentMonth && emi.endDate >= this.currentMonth)
      const currentMonthSettlements = this.settlements.filter(settlement => settlement.month === this.currentMonth)
      this.currentMonthExpenses = [
        ...currentMonthEMIs,
        ...currentMonthSettlements
      ].map((expense, index) => {
        return {
          ...expense,
          paid: false,
          index
        }
      })
    },
    handleExpensePaid (expense) {
      this.currentMonthExpenses[expense.index].paid = !this.currentMonthExpenses[expense.index].paid
      // if (expense.paid) {
      //   this.accountBalance -= expense.amount
      // } else {
      //   this.accountBalance += expense.amount
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.label{
  font-size: 12px;
}
.value{
  font-size:16px;
  font-weight: bold;
}
.expenses-container{
  column-gap: 15px;
}
.expenses-chart{
  height: 380px;
  width: 100%;
}
.expenses {
  .checkbox {
    width: 50px;
    display: flex;
    justify-content: center;
  }

  .checkbox-container {
    border: 1px solid #0086C4;
    width: 15px;
    height: 15px;
    border-radius: 4px;
    position: relative;

    &.checked {
      background-color: #0086C4;
    }

    .checkmark {
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      width: 9px;
      height: 5px;
      rotate: -45deg;
      position: absolute;
      left: 2px;
      top: 2px;
    }
  }
}
</style>
