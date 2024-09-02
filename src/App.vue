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

import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    AppNav
  },
  mounted () {
    this.setupData()
  },
  methods: {
    ...mapActions('settlements', ['addSettlement']),
    ...mapActions('emis', ['addEmi']),
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
      settlements.forEach(settlement => {
        this.addSettlement(settlement)
      })
      emis.forEach(emi => {
        this.addEmi(emi)
      })
    }
  }
}
</script>
