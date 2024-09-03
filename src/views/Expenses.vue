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
                  <template v-if="expense.paid">
                    <i class="fa-regular fa-square-check text-primary fs-lg"></i>
                  </template>
                  <template v-else>
                    <i class="fa-regular fa-square text-primary fs-lg"></i>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-5 col-sm-12 col-xs-12">
      <div class="card">
        <div class="body">
          <div class="col-12 justify-center align-center">
            <v-chart class="expenses-chart" :option="chartData" autoresize />
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-xs-12 col-md-3">
      <div class="card mb-4 bg-primary text-white">
        <div class="body">
          <div><span class="label">TOTAL</span></div>
          <div><span class="value">{{ totalExpenses | formatNumber }}</span></div>
        </div>
      </div>
      <div class="card mb-4">
        <div class="body">
          <div><span class="label">ACCOUNT BALANCE</span></div>
          <div v-if="showEditAccountBalance">
            <input type="number" class="edit-account-balance" v-model.number="currentAccountBalance"
              @blur="showEditAccountBalance = false" />
          </div>
          <div v-else class="pointer-cursor" @click="showEditAccountBalance = true">
            <span class="value">
              {{ accountBalance |formatNumber }}
            </span>
          </div>
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
import { mapGetters, mapMutations } from 'vuex'
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
      currentMonthExpenses: [],
      showEditAccountBalance: false
    }
  },
  computed: {
    ...mapGetters('settlements', ['settlements']),
    ...mapGetters('emis', ['emis']),
    ...mapGetters('configuration', ['currentMonth', 'currentMonthSalary', 'accountBalance']),
    currentAccountBalance: {
      get () {
        return this.accountBalance
      },
      set (value) {
        this.SET_ACCOUNT_BALANCE(value)
      }
    },
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
    settlements () { this.buildCurrentMonthExpenses() }
  },
  mounted () {
    this.buildCurrentMonthExpenses()
  },
  methods: {
    ...mapMutations('configuration', ['SET_ACCOUNT_BALANCE']),
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
}
.edit-account-balance{
  border: none;
  outline: none;
  border-bottom: 1px dashed black;
  font-weight: bold;

  &:focus{
    outline: none;
  }
}
</style>
