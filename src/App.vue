<template>
  <div id="app">
    <AppNav />
    <router-view class="app-content"/>
  </div>
</template>
<script>
import AppNav from './components/AppNav.vue'

import settlements from '@/data/settlements'
import emis from '@/data/emi'
import configuration from '@/data/configuration'
import { getUUID } from '@/utils'

import { mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    AppNav
  },
  mounted () {
    this.setupData()
  },
  methods: {
    ...mapMutations('settlements', ['SET_SETTLEMENTS']),
    ...mapMutations('emis', ['SET_EMIS']),
    ...mapMutations('configuration', ['SET_ACCOUNT_BALANCE', 'SET_CURRENT_MONTH', 'SET_ADDITIONAL_INCOME', 'SET_MONTHLY_SALARIES']),
    setupData () {
      this.SET_CURRENT_MONTH(configuration.currentMonth)
      this.SET_ADDITIONAL_INCOME(configuration.additionalIncome.map(additionalIncome => ({
        ...additionalIncome,
        month: additionalIncome.month.getTime()
      })))
      this.SET_MONTHLY_SALARIES(configuration.monthlySalaries.map(monthlySalary => ({
        ...monthlySalary,
        month: monthlySalary.month.getTime()
      })))
      this.SET_ACCOUNT_BALANCE(configuration.accountBalance)
      this.SET_SETTLEMENTS(settlements.map(settlement => ({
        ...settlement,
        id: getUUID(),
        month: new Date(settlement.month).getTime()
      })))
      this.SET_EMIS(emis.map(emi => ({
        ...emi,
        id: getUUID(),
        startDate: new Date(emi.startDate).getTime(),
        endDate: new Date(emi.endDate).getTime()
      })))
    }
  }
}
</script>
